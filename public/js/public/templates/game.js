import { checkGuesses, showTweetPopup } from '../crossword.js'

const game = (state, gameState, finished) => ({
  name: 'game',
  children: {
    crosswordField: {
      listeners: {
        rendered: e => {
          if (finished) {
            showTweetPopup(gameState.results[gameState.attempt].every(r => r.res), gameState, state)
          }
        }
      }
    },
    hints1: {},
    hints2: {},
    actions: {
      children: finished ? {} : {
        check: {
          props: {
            innerText: text(`attempt${6-gameState.attempt}`, state),
            className: 'inactive'
          },
          listeners: {
            click: checkGuesses(state)
          }
        }
      }
    }
  }
})

export default game
