const pool = require('../pool.js')

const showBirds = routes => (req, res) => 
{
  (async _ =>
    {
      const client = await pool.connect()

      const birds = (await client.query("SELECT * FROM birds_names")).rows

      const geni = (await client.query("SELECT * FROM birds_class WHERE id NOT IN (SELECT parent FROM birds_class WHERE parent IS NOT NULL)")).rows

      client.release()

      res.render('admin/birds', {
        title : 'Birds list',
        birds : birds,
        geni : geni,
        routes : routes
      })
    }
  )()
}

const showBird = routes => (req, res) => 
{
  (async _ =>
    {
      const birdId = req.params.birdId

      const client = await pool.connect()
      const birdRecord  = await client.query({
        text : `SELECT * FROM birds_names WHERE id = $1`,
        values : [birdId]
      })
      const birdClasses = await client.query({
        text : `SELECT id, name_lv FROM birds_class`
      })

      client.release()

      res.render('admin/bird', {
        title : 'Bird edit',
        birdData : birdRecord.rows[0],
        birdClasses : birdClasses.rows,
        routes : routes
      })
    }
  )()
}

const saveBird = routes => (req, res) =>
{
  (async _ =>
    {
      const birdId  = req.body.birdId
      const name_en = req.body.name_en
      const name_lv = req.body.name_lv
      const name_lat = req.body.name_lat
      const name_ru = req.body.name_ru
      const genus   = req.body.select_genus

      const client = await pool.connect()

      if (birdId) {
        await client.query({
          name : "bird_update",
          text : "UPDATE birds_names SET name_en = $1, name_lv = $2, name_lat = $3, name_ru = $4, genus = $5 WHERE id = $6",
          values : [name_en, name_lv, name_lat, name_ru, genus, birdId]
        })
      }
      else {
        await client.query({
          name : "baseimage_insert",
          text : "INSERT INTO birds_names (name_en, name_lv, name_lat, name_ru, genus) VALUES ($1, $2, $3, $4, $5)",
          values : [name_en, name_lv, name_lat, name_ru, genus]
        })
      }

      client.release()

      res.redirect(routes.admin.birds.url)
    }
  )()
}

const changeGenus = routes => (req, res) =>
{
  (async _ =>
    {
      const birdId  = req.body.birdId
      const genus   = req.body.genus || null

      const client = await pool.connect()

      if (birdId && genus) {
        await client.query({
          name : "class_update",
          text : "UPDATE birds_names SET genus = $1 WHERE id = $2",
          values : [genus, birdId]
        })
      }

      client.release()

      res.json({ status : 'OK' })
    }
  )()
}

module.exports = { showBirds, showBird, saveBird, changeGenus }
