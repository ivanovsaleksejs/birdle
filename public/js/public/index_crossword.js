import element from './element.js'
import hint from './templates/hint.js'
import game from './templates/game.js'
import header from './templates/header.js'
import { crosswordRow } from './templates/crossword.js'
import openPopup from './popup.js'
import { cellFocus, cellInput, cellKeyDown, getCellClassName, getCellChildren } from './cells.js'
import { defineBoundaries, checkGuesses, showTweetPopup } from './crossword.js'

const initCrossword = (state, callback) =>
{
  ajax('/getCrossword', {}, 'GET', {}, res =>
    {
      let data = JSON.parse(res)
      state.lang = data.lang
      state.texts = data.texts
      callback(data.crossword[0], data.gameState, state)
    }
  )
}

const drawCrossword = (crossword, gameState, state) =>
{
  let boundaries = defineBoundaries(crossword)
  let finished = (gameState.results && gameState.results[gameState.attempt].every(r => r.res)) || (gameState.results && gameState.attempt >= 6)

  state.gamedata = {
    crossword: crossword,
    changed: false
  }
  state.header = element(header(state))
  state.game = element(game(state, gameState, finished))

  drawTiles(crossword, gameState, boundaries, state.game, state, finished)
  drawBirds(crossword, gameState, state.game)
  state.game.appendTo(document.body, 'game')
}

const drawTiles = (crossword, gameState, boundaries, game, state, finished) =>
{
  let cellWidth = 80/(boundaries.right - boundaries.left)

  let grid = Array.from({length: boundaries.bottom - boundaries.top},
    (_, i) => [
      `crosswordrow${i}`,
      element(crosswordRow(boundaries, cellWidth, i))
    ]
  )
  Array.from(
    {length: 6},
    (_, i) => {
      Array.from(
        {length : crossword[`name${i + 1}`]},
        (_, c) => {
          let x = crossword[`offset${i + 1}`] + (crossword[`dir${i + 1}`] == 'ver' ? 0 : c) - boundaries.left
          let y = crossword[`vertoffset${i + 1}`] + (crossword[`dir${i + 1}`] == 'hor' ? 0 : c) - boundaries.top
          let cell = grid[y][1][`cell${y}_${x}`]

          let tried = gameState.attempt
            && gameState.guesses[gameState.attempt]
            && gameState.guesses[gameState.attempt][i]
          let hasGuess = tried
            && gameState.results
            && gameState.results[gameState.attempt]
            && gameState.results[gameState.attempt][i]
          let val = cell.children && cell.children.input && cell.children.input.props.value
            ? cell.children.input.props.value
            : ''

          cell.props.className = getCellClassName(cell, crossword, tried, hasGuess, i, c, gameState)
          cell.children = getCellChildren(cell, finished, tried, val, i, c, gameState)

          cell.data = {
            ...cell.data ?? {},
            ...{
              dir: crossword[`dir${i + 1}`],
              x: x,
              y: y,
              id: [...cell.data ? cell.data.id ?? [] : [], i + 1].join(' ')
            }
          }

          cell.children.input.listeners = {
            focus: cellFocus(state),
            input: cellInput(state),
            keydown: cellKeyDown(state)
          }

          if (c == 0) {
            let dir = crossword[`dir${i + 1}`]
            let wordcell = grid[y - (dir == 'ver')][1][`cell${y - (dir == 'ver')}_${x - (dir == 'hor')}`]
            wordcell.children = {
              ...wordcell.children ?? {},
              [`label${i+1}`]: {
                name: 'wordlabel',
                props: {
                  className: `lab${i+1} ${dir}`
                }
              }
            }
          }
        }
      )
    }
  )
  game.crosswordField.children = Object.fromEntries(grid)
}

const drawBirds = (crossword, gameState, game) =>
{
  Array.from(
    { length: 2 },
    (_, j) => {
      let hints = Array.from(
        { length: 3 },
        (_, i) => [`hint${3 * j + i + 1}`, hint(i, j, gameState, crossword)]
      )
      game[`hints${j + 1}`].children = Object.fromEntries(hints)
    }
  )
}

const state = {}

const events = {}

window.addEventListener('load', _ =>
  {
    initCrossword(state, drawCrossword)
  }
)

addObserver(state, events)
