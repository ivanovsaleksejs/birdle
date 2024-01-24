const pool = require('../pool.js')
const { langs, texts, text, errorMessage } = require('../texts.js')

// A custom random generator that generates the same sequence with the same seed
const rnd = seed => (
  state = seed,
  _ => (
    state = Math.sin(state) * 10000, state - Math.floor(state)
  )
)

const shuffle = (l, rand) => {
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < l.length; i++) {
      let r = rand() * l.length >>> 0
      let tmp = l[i]
      l[i] = l[r]
      l[r] = tmp
    }
  }
  return l
}

// Make a pattern with 3 defined characters and two wildcards of fixed lengths between them
// Example: a.{1}b.{2}c
const makePattern = (l, g) => (
  l = l.map(c => c.toLowerCase()),
  `${l[0]}.{${g[0]}}${l[1]}.{${g[1]}}${l[2]}`
)

// Check if of three numbers, none is equal to each other and none pair has diff less than 2.
// This makes sure none of vertical words are too close to each other - at least one cell gap.
const checkDiff = (a, b, c) => (
  a !== b &&
  a !== c &&
  b !== c &&
  Math.abs(a - b) > 1 &&
  Math.abs(a - c) > 1 &&
  Math.abs(b - c) > 1
)

// Returns a 3-permutations of a list
const combinations = list => list.flatMap(
  (a, _, l) => l.filter(x => x != a).flatMap(
    (b, _, l1)=> l.filter(x => x != b && x != a).map(
      (c, _, l2) => [a, b, c]
    )
  )
)

const today = _ => (new Date()).toLocaleString('fr-CA', { timeZone: 'Europe/Riga', year: 'numeric', month: '2-digit', day: '2-digit'})

// Creates patterns for all possible intersections of given three words
const makeIntersections = (words, offset2, offset3, gaps) =>
{
  const minOffset = (m = Math.min(offset2, offset3)) > 0 ? 0 : m
  const offsets = [0, offset2, offset3].map(x => x - minOffset)

  const maxLength = offsets.reduce((a, x, i) => (y = x + words[i].name.length) > a ? y : a)

  const grid = [];
  const intersections = [];

  for (let j = 0; j <= 2; j++) {
    let row = [...Array(maxLength).fill('')]

    for (let i = 0; i < maxLength; i++) {
      row[i] = words[j].name[i-offsets[j]] || ''
    }

    grid.push(row)
  }

  for (let j = 0; j <= maxLength; j++) {
    let pattern = [...Array(3)].map((_, i) => grid[i][j])

    // We will not create intersections with spaces, we are grown-ups
    if (pattern.every(x => x && x != ' ')) {
      intersections.push({
        offset: j - offsets[0],
        pattern: makePattern(pattern, gaps)
      })
    }
  }

  return intersections;
}

// Generates a crossword puzzle with three horizontal and three vertical words
// where all vertical words cross all horizontal words
const makePuzzles = candidates =>
{

  let combs = combinations([0,1,2,3,4,5])
  let puzzles = []

  for (let c of combs) {
    let horiz = [candidates[c[0]], candidates[c[1]], candidates[c[2]]]
    let vert = candidates.filter(c => horiz.indexOf(c) == -1)

    // Gaps between three horizontal words
    const gaps = [[1,1], [2,1], [1,2], [2,2], [1,3], [3,1], [2,3], [3,2]]

    // Second and third horizontal words can be moved horizontally
    // as long as there's a way to intersect all three of them
    for (let o1 = 1 - horiz[1].name.length; o1 < horiz[1].name.length; o1++) {
      for (let o2 = 1 - horiz[2].name.length; o2 < horiz[2].name.length; o2++) {
        for (let g of gaps) {
          // Generate all possible intersection patterns for three horizontal words
          let patterns = makeIntersections(horiz, o1, o2, g)

          // There are at least three intersections
          if (patterns.length > 2) {
            // Check for all valid intersections for all words
            // Each word can possibly used in more than one place in the grid
            let scan = vert.map(w => ({
              word: w.name,
              id: w.id,
              match: patterns.filter(r => (new RegExp(r.pattern)).test(w.name.toLowerCase()))
            }))

            // Filter those words that have at least one match
            let matched = scan
              .filter(w => w.match.length > 0)
            // Save the vertical offset for matched patterns
              .map(w => (w.match[0]["vertOffset"] = 0 - w.word.toLowerCase().match(w.match[0].pattern).index, w))
            // Use only first match
              .map(w => (w.match = w.match[0], w))

            // We have three words that can intersect given three words
            // and none of them is too close to each other
            if (matched.length == 3 && checkDiff(...(matched.slice(0, 3).map(x => x.match.offset)))){
              puzzles.push({
                horiz: {
                  words: horiz,
                  offsets: [o1, o2]
                },
                vert: matched
              })
              // For now don't generate more than one
              // Might be changed later
              if (puzzles.length) {
                return [puzzles, g]
              }
            }
          }
        }
      }
    }
  }
}


// Draw the puzzle in console
const outputGrid = (words, gaps) =>
{
  // Define grid boundaries
  const leftest = Math.min(...words.slice(0,3).map(o => o.offset))
  const rightest = Math.max(...words.slice(0, 3).map(obj => obj.word.length + obj.offset));

  const topest = Math.min(...words.slice(3).map(obj => obj.vertOffset));
  const bottomest = Math.max(...words.slice(3).map(obj => obj.word.length + obj.vertOffset));

  const gridWidth = rightest - leftest;
  const gridHeight = bottomest - topest;

  const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(' '));

  // Put horizontal words in the grid
  words.slice(0, 3).forEach((obj, index) => {
    const { word, offset } = obj;
    const row = gaps[index] - topest;
    const col = offset - leftest;

    grid[row].splice(col, word.length, ...word);
  });

  // Put vertical words in the grid
  words.slice(3).forEach((obj, index) => {
    const { word, offset, vertOffset } = obj;
    const col = offset - leftest;
    const row = vertOffset - topest;

    for (let i = 0; i < word.length; i++) {
      grid[row+i][col] = word[i]
    }
  });

  // Output to console
  grid.forEach(row => console.log(row.join(' | ')));
}

const generateCrossword = async lang =>
{
  const date = today()
  const client = await pool.connect()

  const birds = (await client.query(`SELECT t.*, n.name_${lang} as name FROM birds_tasks t LEFT JOIN birds_names n ON t.bird_id = n.id`)).rows

  let rand = rnd((new Date(date).getTime()) / 86400000 >>> 0)

  let candidates = shuffle(birds.map(x => ({id: x.id, name: x.name.toLowerCase()})), rand)

  const [puzzles, gaps] = makePuzzles(candidates)
  const puzzle = puzzles[0]
  const words = [
    { id: puzzle.horiz.words[0].id, word: puzzle.horiz.words[0].name, offset: 0, vertOffset: 0, dir: 'hor' },
    { id: puzzle.horiz.words[1].id, word: puzzle.horiz.words[1].name, offset: puzzle.horiz.offsets[0], vertOffset: gaps[0] + 1, dir: 'hor' },
    { id: puzzle.horiz.words[2].id, word: puzzle.horiz.words[2].name, offset: puzzle.horiz.offsets[1], vertOffset: gaps[0] + gaps[1] + 2, dir: 'hor' },
    { id: puzzle.vert[0].id, word: puzzle.vert[0].word, offset: puzzle.vert[0].match.offset, vertOffset: puzzle.vert[0].match.vertOffset, dir: 'ver' },
    { id: puzzle.vert[1].id, word: puzzle.vert[1].word, offset: puzzle.vert[1].match.offset, vertOffset: puzzle.vert[1].match.vertOffset, dir: 'ver' },
    { id: puzzle.vert[2].id, word: puzzle.vert[2].word, offset: puzzle.vert[2].match.offset, vertOffset: puzzle.vert[2].match.vertOffset, dir: 'ver' }
  ]

  //outputGrid(words, [0, gaps[0]+1, gaps[0] + gaps[1] + 2])
  words.sort((a,b) => a.vertOffset - b.vertOffset || a.offset - b.offset)

  let saveCrosswordQuery = `INSERT INTO crosswords
    (
      date, lang,
      ${Array.from({ length: 6 }, (_, i) =>`task_id${i + 1}`).join(', ')},
      ${Array.from({ length: 6 }, (_, i) =>`offset${i + 1}`).join(', ')},
      ${Array.from({ length: 6 }, (_, i) =>`vertoffset${i + 1}`).join(', ')},
      ${Array.from({ length: 6 }, (_, i) =>`dir${i + 1}`).join(', ')}
    )
    VALUES
    (
      ${Array.from({ length: 26 }, (_, i) =>`\$${i + 1}`).join(', ')}
    )`

  await client.query(
    {
      text : saveCrosswordQuery,
      values : [
        today(),
        lang,
        ...words.map(w => w.id),
        ...words.map(w => w.offset),
        ...words.map(w => w.vertOffset),
        ...words.map(w => w.dir)
      ]
    }
  )

  client.release()
  return words
}

const compareLines = (line1, line2) => {
  if (line1.length !== line2.length) {
    return { res: false }
  }

  const differingIndices = [];

  for (let i = 0; i < line1.length; i++) {
    if (line1[i] !== line2[i]) {
      differingIndices.push(i);
      if (differingIndices.length > 3) {
        return {res: false};
      }
    }
  }

  return differingIndices.length
    ? { res: false, dif: differingIndices }
    : { res: true };
}

const checkCrossword = routes => (req, res) =>
{
  (async _ =>
    {
      let formidable = require('formidable')
      let htmlEntities = require('html-entities')
      let session = req.session
      let cookies = req.cookies
      let lang = req.session.lang

      if (!session.gamestate || !session.gamestate[`crossword_${lang}`]) {
        await readCrossword(cookies, session)
      }
      if (session.gamestate[`crossword_${lang}`].attempt >= 6) {
        res.send(JSON.stringify({ error: true, message: 'Already played!' }))
        return
      }
      let form = new formidable.IncomingForm()
      form.parse(req, async (error, fields, file) => {
        let attempt = session.gamestate[`crossword_${lang}`].attempt + 1
        if (attempt > 6) {
          res.send(JSON.stringify({ error: true, message: 'Already played!' }))
          return
        }
        session.gamestate[`crossword_${lang}`].attempt = attempt
        let guesses = JSON.parse(fields.guesses).map(line => htmlEntities.encode(line.trim()))
        if (!session.gamestate[`crossword_${lang}`].guesses) {
          session.gamestate[`crossword_${lang}`].guesses = {}
        }
        if (!session.gamestate[`crossword_${lang}`].results) {
          session.gamestate[`crossword_${lang}`].results = {}
        }
        session.gamestate[`crossword_${lang}`].guesses[attempt] = guesses
        let results = guesses.map((guess, i) => compareLines(guess, session.gamestate.words[i].toLowerCase()))
        session.gamestate[`crossword_${lang}`].results[attempt] = results
        const client = await pool.connect()
        let imagesQuery = `
          SELECT
            CASE
              ${Array.from(
                { length: 6 },
                (_, i) => `WHEN t.id = dt.task_id${i + 1} THEN t.image${results[i].res || attempt == 6 ? 6 : (attempt + 1)}`
              ).join(" ")}
            END AS image
            FROM birds_tasks t
            JOIN (
              SELECT task_id1, task_id2, task_id3, task_id4, task_id5, task_id6
              FROM crosswords WHERE date = $1 AND lang = $2 limit 1
            ) dt
            ON t.id IN (dt.task_id1, dt.task_id2, dt.task_id3, dt.task_id4, dt.task_id5, dt.task_id6)
            ORDER BY array_position(ARRAY[dt.task_id1, dt.task_id2, dt.task_id3, dt.task_id4, dt.task_id5, dt.task_id6], t.id)
        `
        let images = (await client.query({text: imagesQuery, values: [today(), lang]})).rows
        client.release()
        session.gamestate[`crossword_${lang}`].images = images
        res.send(JSON.stringify({
          error: false,
          results: results,
          images: images,
          guesses: session.gamestate[`crossword_${lang}`].guesses,
          gamestate: session.gamestate[`crossword_${lang}`]
        }))
      })
    }
  )()
}

const readCrossword = async (cookies, session) =>
{
  if (typeof session.lang == 'undefined') {
    session.lang = 'lv'
    session.save()
  }
  let lang = session.lang
  if (!session.gamestate) {
    session.gamestate = {}
  }
  if (!session.gamestate[`crossword_${lang}`]) {
    session.gamestate[`crossword_${lang}`] = {
      attempt: 0,
      date: today()
    }
  }
  const client = await pool.connect()
  const date = today()
  let crosswordQuery = `
      SELECT
        ${Array.from({ length: 6 }, (_, i) =>`offset${i + 1}`).join(', ')},
        ${Array.from({ length: 6 }, (_, i) =>`vertoffset${i + 1}`).join(', ')},
        ${Array.from({ length: 6 }, (_, i) =>`dir${i + 1}`).join(', ')},
        ${Array.from({ length: 6 }, (_, i) =>`t${i + 1}.image1 as image${i + 1}`).join(', ')},
        ${Array.from({ length: 6 }, (_, i) => `LENGTH(n${i + 1}.name_${session.lang}) as name${i + 1}`).join(', ')} FROM crosswords c
        ${Array.from({ length: 6 }, (_, i) => `JOIN birds_tasks t${i + 1} ON c.task_id${i + 1} = t${i + 1}.id`).join('\n')}
        ${Array.from({ length: 6 }, (_, i) => `JOIN birds_names n${i + 1} ON t${i + 1}.bird_id = n${i + 1}.id`).join('\n')}
      WHERE date = $1 and lang = $2
  `
  let todayCrossword = (await client.query({text: crosswordQuery, values: [date, session.lang]})).rows
  if (todayCrossword.length == 0) {
    generateCrossword(session.lang)
    todayCrossword = (await client.query({text: crosswordQuery, values: [date, session.lang]})).rows
  }
  let crosswordNameQuery = `
      SELECT
        ${Array.from({ length: 6 }, (_, i) => `n${i + 1}.name_${session.lang} as name${i + 1}`).join(', ')} FROM crosswords c
        ${Array.from({ length: 6 }, (_, i) => `JOIN birds_tasks t${i + 1} ON c.task_id${i + 1} = t${i + 1}.id`).join('\n')}
        ${Array.from({ length: 6 }, (_, i) => `JOIN birds_names n${i + 1} ON t${i + 1}.bird_id = n${i + 1}.id`).join('\n')}
      WHERE date = $1 and lang = $2
  `
  session.gamestate.words = Object.values((await client.query({text: crosswordNameQuery, values: [date, session.lang]})).rows[0])
  session.save()
  client.release()
  return todayCrossword
}

const getCrossword = routes => (req, res) =>
{
  (async _ => {
    let session = req.session
    let cookies = req.cookies
    let lang = session.lang
    let todayCrossword = await readCrossword(cookies, session)
    let gameState = session.gamestate[`crossword_${lang}`]

    res.send(JSON.stringify({
      error: false,
      lang: lang,
      crossword: todayCrossword,
      gameState: gameState,
      texts: texts
    }))
  })()
}

const displayCrosswordPage = routes => (req, res) =>
{
  (async _ => {
    const { types } = require('pg')

    types.setTypeParser(1082, v => v)

    const client = await pool.connect()

    let session = req.session
    let cookies = req.cookies
      //TODO: REMOVE
      //session.gamestate = null
      //session.save()

    if (req.query.lang) {
      if (['en', 'lv', 'ru'].indexOf(req.query.lang) !== -1) {
        req.session.lang = req.query.lang
      }
      client.release()
      req.session.save()
      res.redirect(routes.public.crossword.url)
      return
    }
    if (typeof req.session.lang == 'undefined') {
      req.session.lang = 'lv'
      req.session.save()
    }

    let lang = req.session.lang
    const date = today()
    if (!session.gamestate) {
      session.gamestate = {}
    }
    if (!session.gamestate[`crossword_${lang}`]) {
      session.gamestate[`crossword_${lang}`] = {
        attempt: 0,
        date: date
      }
    }

    let crosswordQuery = "SELECT * FROM crosswords WHERE date = $1 and lang = $2"
    let todayCrossword = (await client.query({text: crosswordQuery, values: [date, session.lang]})).rows
    if (todayCrossword.length == 0) {
      await generateCrossword(session.lang)
      todayCrossword = (await client.query({text: crosswordQuery, values: [date, session.lang]})).rows
      session.gamestate[`crossword_${lang}`] = {
        attempt: 0,
        date: date
      }
      let crosswordNameQuery = `
        SELECT
          ${Array.from({ length: 6 }, (_, i) => `n${i + 1}.name_${session.lang} as name${i + 1}`).join(', ')} FROM crosswords c
          ${Array.from({ length: 6 }, (_, i) => `JOIN birds_tasks t${i + 1} ON c.task_id${i + 1} = t${i + 1}.id`).join('\n')}
          ${Array.from({ length: 6 }, (_, i) => `JOIN birds_names n${i + 1} ON t${i + 1}.bird_id = n${i + 1}.id`).join('\n')}
        WHERE date = $1 and lang = $2
      `
      session.gamestate.words = Object.values((await client.query({text: crosswordNameQuery, values: [date, session.lang]})).rows[0])
    }
    if (todayCrossword[0].date !== session.gamestate[`crossword_${lang}`].date) {
      session.gamestate[`crossword_${lang}`] = {
        attempt: 0,
        date: date
      }
    }
    client.release()
    res.render('public/crossword', {
      page : "crossword",
    })
  })()
}

module.exports = { displayCrosswordPage, getCrossword, checkCrossword }
