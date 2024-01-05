import openPopup from './popup.js'
import element from './element.js'
import tweetPopup from './templates/tweetpopup.js'

const drawAttempts = (results, guesses, state) =>
{
  for (let i=0; i < results.results.length; i++) {
    let hintsField = i < 3 ? 1 : 2
    let hint = state.game[`hints${hintsField}`][`hint${+i + 1}`]
    element({
      name: 'div',
      props: {
        className: results.results[i].res
          ? 'correct'
          : results.results[i].dif
            ? 'mistake'
            : guesses[i] != ''
              ? 'wrong'
              : ''
      }
    }).appendTo(hint.result)
  }
}

const defineBoundaries = crossword =>
{
  let b = Object.entries(crossword).reduce((a, b) => {
    if (b[0].indexOf('vertoffset') == 0) {
      if (b[1] < a.top) {
        a.top = b[1]
      }
      let index = +b[0].replace('vertoffset', '')
      if (crossword[`dir${index}`] == 'ver' && b[1] + crossword[`name${index}`] > a.bottom) {
        a.bottom = b[1] + crossword[`name${index}`]
      }
    }
    if (b[0].indexOf('offset') == 0) {
      if (b[1] < a.left) {
        a.left = b[1]
      }
      let index = +b[0].replace('offset', '')
      if (crossword[`dir${index}`] == 'hor' && b[1] + crossword[`name${index}`] > a.right) {
        a.right = b[1] + crossword[`name${index}`]
      }
    }
    return a
  }, {left: 0, top: 0, right: 0, bottom: 0})
  return {left: b.left - 1, top: b.top - 1, right: b.right + 1, bottom: b.bottom + 1}
}

const processResponse = (state, guesses, boundaries) => result =>
{
  result = JSON.parse(result)

  if (result.error) {
    console.log(result.error)
    return
  }

  let images = result.images
  drawAttempts(result, guesses, state)

  let res = result.results

  for (let i in guesses) {
    state.game[`hints${i < 3 ? 1 : 2}`][`hint${+i+1}`].img.node.src = images[i].image
    let [x, y, len, dir] = [
      state.gamedata.crossword[`offset${+i + 1}`] - boundaries.left,
      state.gamedata.crossword[`vertoffset${+i + 1}`] - boundaries.top,
      state.gamedata.crossword[`name${+i + 1}`],
      state.gamedata.crossword[`dir${+i + 1}`],
    ]

    for (let c = 0; c < len; c++) {
      let cell = state.game.crosswordField[`crosswordrow${y + (dir == 'ver' ? c : 0)}`][`cell${y + (dir == 'ver' ? c : 0)}_${x + (dir == 'hor' ? c : 0)}`].node
      if (guesses[i]) {
        let newClass = res[i].res
          ? 'correct'
          : res[i].dif
            ? res[i].dif.indexOf(c) !== -1
              ? 'mistake'
              : 'correct'
            : 'wrong'
        if (newClass == 'correct'
          || (newClass == 'mistake' && !cell.classList.contains('correct'))
          || (newClass == 'wrong' && !(cell.classList.contains('correct') || cell.classList.contains('mistake')))
        ) {
          cell.classList.remove('correct', 'wrong', 'mistake')
          cell.classList.add(newClass)
        }
      }
    }
  }

  let attempt = result.gamestate.attempt
  if (res.every(r => r.res)) {
    state.game.actions.check.node.innerText = text(`attempt${6 - attempt}`, state)
    state.game.actions.check.node.innerText = text(`right${attempt > 5 ? 1 : attempt > 3 ? 2 : attempt > 1 ? 3 : 4}`, state)
  }
  else {
    state.game.actions.check.node.innerText = text(attempt >= 6 ? `defeat` : `attempt${6 - attempt}`, state)
  }

  if (res.every(r => r.res) || attempt >= 6) {
    state.game.crosswordField.lookup('cell*')
      .filter(n => n.node.classList.contains('char'))
      .map(n => n.input.node.disabled = true)
    showTweetPopup(res.every(r => r.res), result.gamestate, state)
  }
}

const checkGuesses = state => e =>
{
  if (!state.gamedata.changed) {
    return
  }
  state.gamedata.changed = false
  state.game.actions.check.node.classList.add('inactive')

  for (let row in state.game.crosswordField.children) {
    for (let cell in state.game.crosswordField[row].children) {
      state.game.crosswordField[row][cell].node.classList.remove('correct', 'wrong', 'mistake')
    }
  }

  let crossword = state.gamedata.crossword
  let boundaries = defineBoundaries(crossword)
  let guesses = Array.from(
    { length: 6 },
    (_, i) => {
      let [x, y] = [crossword[`offset${i + 1}`] - boundaries.left, crossword[`vertoffset${i + 1}`] - boundaries.top]
      let [dir, len] = [crossword[`dir${i + 1}`], crossword[`name${i + 1}`]]
      let word = Array.from(
        { length: len },
        (_, o) => {
          let [xc, yc] = [x + (dir == 'hor' ? o : 0), y + (dir == 'ver' ? o : 0)]
          let val = state.game.crosswordField[`crosswordrow${yc}`][`cell${yc}_${xc}`].input.node.value
          return val ? val : " "
        }
      ).join("").trim()
      return word.length >= len ? word : ""
    }
  )

  let fd = new FormData()

  fd.append('guesses', JSON.stringify(guesses))

  ajax('/checkcrossword', fd, "POST", {'Accept' : '*/*'}, processResponse(state, guesses, boundaries))
}

const showTweetPopup = (success, res, state) =>
{
  let tweet = success
    ? text(`tweetCWPrefix`, state) + text(`tweetCWHeader${res.attempt}`, state)
    : text(`tweetCWHeaderFail`, state) + "\n"
  let boxes = ''
  for (let r in res.results) {
    boxes += Array.from(
      { length: 6 },
      (_, i) => res.results[r][i].res
        ? "\u{1F7E9}"
        : res.results[r][i].dif
          ? "\u{1F7E7}"
          : res.guesses[r][i] == ''
            ? "\u{2B1C}"
            : "\u{1F7E5}"
    ).join('')
    boxes += "\n"
  }
  tweet += "\n" + boxes + "\n" + document.location.href + " #birdle"
  tweet = encodeURIComponent(tweet)

  let tweetlink = `https://twitter.com/intent/tweet/?text=${tweet}`

  openPopup(tweetPopup(res, success, boxes, tweetlink, state), state)
}

export { drawAttempts, defineBoundaries, checkGuesses, showTweetPopup }
