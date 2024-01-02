const hint = (i, j, gameState, crossword) =>
({
  name: 'div',
  props: {
    className: `hint question${3 * j + i + 1}`
  },
  children: {
    img: {
      props: {
        src: gameState.images ? gameState.images[3*j+i].image : crossword[`image${3 * j + i + 1}`]
      }
    },
    result: {
      children: gameState.results
      ? Object.fromEntries(Array.from( {length : gameState.attempt}, (_, r) => [
        `res${r}`,
        ({
          name: 'div',
          props: {
            className: gameState.results[r + 1][3 * j + i].res
            ? 'correct'
            : gameState.results[r + 1][3 * j + i].dif
            ? 'mistake'
            : gameState.guesses[r + 1][3 * j + i]
            ? 'wrong'
            : ''
          }
        })
      ]))
      : {}
    }
  }
})

export default hint
