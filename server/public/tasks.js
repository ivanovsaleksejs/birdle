const pool = require('../pool.js')
const crypto = require('crypto')
const { langs, texts, text, errorMessage } = require('../texts.js')

const showTodaysTask = routes => (req, res) =>
{
  (async _ =>
    {
      const { types } = require('pg')

      types.setTypeParser(1082, v => v)

      const client = await pool.connect()

      let session = req.session
      let cookies = req.cookies
      let imagenumber = session.imagenumber ?? 1

      if (typeof cookies.uuid == 'undefined' || cookies.uuid.match(/[^0-9a-f]/)) {
        res.cookie('uuid', crypto.createHash('sha256').update(Math.random() + "").digest('hex'), {maxAge : 1000 * 60 * 60 * 24 * 7 * 365})
      }
      else if (typeof cookies.uuid !== 'undefined'){
        res.cookie('uuid', cookies.uuid, {maxAge : 1000 * 60 * 60 * 24 * 7 * 365})
      }

      req.session.uuid = cookies.uuid

      if (req.query.lang) {
        if (!req.session.lang && ['en', 'lv', 'ru'].indexOf(req.query.lang) !== -1) {
          req.session.lang = req.query.lang
        }
        client.release()
        req.session.save()
        res.redirect(routes.public.index.url)
        return
      }

      if (typeof req.session.lang == 'undefined') {
        req.session.lang = 'lv'
      }

      let lang = req.session.lang
      let today = (new Date()).toLocaleString('sv-SE', {timeZone : 'Europe/Riga'}).split(' ')[0]

      if (typeof session.taskId !== 'undefined' && req.session.taskdate !== today) {
        imagenumber = 1
        delete req.session.imagenumber
        delete req.session.success
        delete req.session.taskId
        req.session.tries = 0
        req.session.attempts = []
        req.session.attemptIds = []
      }
      req.session.save()

      const format = require('pg-format')

      let condition = typeof req.session.taskId !== 'undefined'
        ? `t.id = ${req.session.taskId}`
        : `t.date = DATE(NOW() AT TIME ZONE 'Europe/Riga')`

      const sql = format("SELECT t.*, tt.image%s as image FROM daily_tasks t LEFT JOIN birds_tasks tt ON tt.id = t.task_id WHERE %s", ""+imagenumber, condition)
      const taskQuery = (await client.query(sql)).rows
      const birdnames = (await client.query("SELECT id, name_lv, name_en, name_ru, name_lat FROM birds_names")).rows

      let task = null

      if (taskQuery.length > 0) {
        task = taskQuery[0]
      }

      client.release()

      if (typeof req.session.taskId == 'undefined' || req.session.taskdate !== today) {
        req.session.taskId = task.id
        req.session.birdNumber = task.bird_number
        req.session.taskdate = task.date
        delete req.session.success
        req.session.tries = 0
        req.session.attempts = []
        req.session.attemptIds = []
      }

      if (typeof session.tries == 'undefined') {
        req.session.tries = 0
        req.session.attempts = []
        req.session.attemptIds = []
      }

      res.render('public/dailytask', {
        routes : routes,
        birdnames : birdnames,
        success : req.session.success ?? false,
        tries : req.session.tries,
        task : task,
        text : text,
        lang : lang,
        attempts : req.session.attempts,
        title : text(lang, 'title')
      })
    }
  )()
}

const getBirdNames = routes => (req, res) =>
{
  (async _ =>
    {
      const client = await pool.connect()

      const birdnames = (await client.query("SELECT id, name_lv, name_en, name_ru, name_lat FROM birds_names")).rows
      const geni = (await client.query("SELECT id, name_lv, name_en, name_ru FROM birds_class")).rows

      client.release()

      let attempts = []
      let attemptIds = []
      let success = false
      let correctName = ''
      if (req.session.attempts && req.session.attempts.length) {
        let last = req.session.attempts[req.session.attempts.length-1]
        success = last.result
        attemptIds = req.session.attempts.map(a => [a.orderId, a.familyId, a.genusId, a.nameId])
        if (last.tries >= 6 || last.result) {
          attempts = req.session.attempts.map(a => [a.orderGuessed, a.familyGuessed, a.genusGuessed, a.result])
          correctName = last.correctName
        }
      }

      res.send(JSON.stringify(
        {
          lang : req.session.lang,
          birdnames : birdnames,
          geni : geni,
          texts : texts,
          attempts : attempts,
          attemptIds : attemptIds,
          taskId : req.session.taskId,
          birdNumber : req.session.birdNumber,
          success : success,
          correctName : correctName
        }
      ))
    }
  )()
}

const changeLanguage = async (lang, req) =>
{
  let returnData = {}
  if (langs.indexOf(lang) !== -1) {
    req.session.lang = lang
    req.session.save()
    returnData = {
      event : 'changeTexts',
      target : '.game',
      data : texts[lang]
    }
  }

  return JSON.stringify(returnData)
}

const getStats = async (_, req) =>
{
  let returnData = {
    event : 'renewStats',
    target : '.game',
    data : {
      total : 0,
      successes : 0,
      stats1 : 0,
      stats2 : 0,
      stats3 : 0,
      stats4 : 0,
      stats5 : 0,
      stats6 : 0
    }
  }

  if (typeof req.session !== 'undefined' && typeof req.session.uuid !== 'undefined') {
    const client = await pool.connect()

    const stats = (await client.query(
      {
        text : "SELECT * FROM stats WHERE uuid = $1",
        values : [req.session.uuid]
      }
    )).rows

    client.release()

    if (stats.length) {
      let total = stats[0].successes + stats[0].fails
      returnData.data = {
        ...returnData.data,
        ...{
          total : total,
          successes : stats[0].successes,
          stats1 : stats[0].stats1,
          stats2 : stats[0].stats2,
          stats3 : stats[0].stats3,
          stats4 : stats[0].stats4,
          stats5 : stats[0].stats5,
          stats6 : stats[0].stats6,
        }
      }
    }
  }
  return JSON.stringify(returnData)
}

const guessBird = async (birdId, req) =>
{

  let session = req.session
  let lang = session.lang ?? 'lv'

  let tries = session.tries ?? 0

  if (tries > 5) {
    return JSON.stringify(errorMessage(lang, 'maxTries'))
  }
  if (session.success) {
    return JSON.stringify(errorMessage(lang, 'alreadyWon'))
  }
  if (!((birdId = parseInt(birdId)) > 0)) {
    return JSON.stringify(errorMessage(lang, 'wrongInput'))
  }

  const client = await pool.connect()

  if (!req.session.taskId) {
    req.session.taskId = (await client.query(`SELECT t.id as id FROM daily_tasks t WHERE t.date = DATE(NOW() AT TIME ZONE 'Europe/Riga')`)).rows[0].id
  }
  req.session.save()

  tries += 1

  req.session.tries = tries
  let nextimage = tries > 5 ? 6 : tries + 1
  req.session.imagenumber = nextimage

  const task = (await client.query(`SELECT t.*, tt.bird_id AS bird_id, tt.image${nextimage} as nextimage,
    tt.image6 as finalimage
    FROM daily_tasks t
    LEFT JOIN birds_tasks tt ON tt.id = t.task_id
    WHERE t.id = ${req.session.taskId}`
  )).rows[0]

  const guessGenus = (await client.query(
    {
      text : `SELECT b.name_${lang} as name, b.id as name_id,
        c1.name_${lang} as genus, c1.id as genus_id,
        c2.name_${lang} as family, c2.id as family_id,
        c3.name_${lang} as order, c3.id as order_id
        FROM birds_names b
        LEFT JOIN birds_class c1 ON c1.id = b.genus
        LEFT JOIN birds_class c2 ON c2.id = c1.parent
        LEFT JOIN birds_class c3 ON c3.id = c2.parent
        WHERE b.id = $1`,
      values : [birdId]
    }
  )).rows[0]

  const genus = (await client.query(
    {
      text : `SELECT b.name_${lang} as name, b.id as name_id,
        c1.name_${lang} as genus, c1.id as genus_id,
        c2.name_${lang} as family, c2.id as family_id,
        c3.name_${lang} as order, c3.id as order_id
        FROM birds_names b
        LEFT JOIN birds_class c1 ON c1.id = b.genus
        LEFT JOIN birds_class c2 ON c2.id = c1.parent
        LEFT JOIN birds_class c3 ON c3.id = c2.parent
        WHERE b.id = $1`,
      values : [task.bird_id]
    }
  )).rows[0]


  const success = birdId == task.bird_id

  if (req.session.uuid) {
    const stats = (await client.query(
      {
        text : "SELECT * FROM stats WHERE uuid = $1",
        values : [req.session.uuid]
      }
    )).rows

    if (success) {
      let statsQuery = stats.length
        ? `UPDATE stats SET stats${tries} = stats${tries} + 1, successes = successes + 1 WHERE uuid = $1`
        : `INSERT INTO stats (uuid, stats${tries}, successes) VALUES ($1, 1, 1)`

      await client.query(
        {
          text : statsQuery,
          values : [req.session.uuid]
        }
      )

      req.session.success = true
      req.session.imagenumber = 6
    }
    else if (tries >= 6) {
      let statsQuery = stats.length
        ? `UPDATE stats SET fails = fails + 1 WHERE uuid = $1`
        : `INSERT INTO stats (uuid, fails) VALUES ($1, 1)`

      await client.query(
        {
          text : statsQuery,
          values : [req.session.uuid]
        }
      )
    }
  }

  client.release()

  const genusData = {
    result : success,
    name : guessGenus.name,
    nameId : guessGenus.name_id,
    order : guessGenus.order,
    orderId : guessGenus.order_id,
    orderGuessed : guessGenus.order_id == genus.order_id,
    family : guessGenus.family,
    familyId : guessGenus.family_id,
    familyGuessed : guessGenus.family_id == genus.family_id,
    genus : guessGenus.genus,
    genusId : guessGenus.genus_id,
    genusGuessed : guessGenus.genus_id == genus.genus_id,
    tries: tries,
    taskId : task.id,
    birdNumber : task.bird_number ?? task.id,
    correctName : success || tries >= 6 ? genus.name : ''
  }

  if (typeof req.session.attempts !== 'undefined') {
    req.session.attempts.push(genusData)
  }
  else {
    req.session.attempts = [genusData]
  }
  req.session.save()

  let attempts = []
  let attemptIds = req.session.attempts.map(a => [a.orderId, a.familyId, a.genusId, a.nameId])
  if (success || tries >= 6) {
    attempts = req.session.attempts.map(a => [a.orderGuessed, a.familyGuessed, a.genusGuessed, a.result])
  }

  const returnData = {
    ...{
      event : 'showResult',
      target : '.tries',
      message : success ? text(lang, 'success') : '',
      nextImage : success ? task.finalimage : task.nextimage,
      attempts : attempts,
      attemptIds : attemptIds,
      taskId : task.id
    },
    ...genusData
  }

  return JSON.stringify(returnData)
}

module.exports = { showTodaysTask, getBirdNames, guessBird, changeLanguage, getStats }
