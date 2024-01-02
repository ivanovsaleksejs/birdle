const cellFocus = state => e => 
{
  let parent = e.target.parentNode
  let ids = parent.dataset.id.split(" ").map(x => +x)
  if (ids.length == 1) {
    state.gamedata.dir = parent.dataset.dir
    state.gamedata.id = parent.dataset.id
  }
  else {
    let sameId = ids.some(x => (state.gamedata.id ?? "").split(" ").map(x => +x).includes(x))
    if (!sameId || !state.gamedata.dir) {
      state.gamedata.dir = parent.dataset.dir
    }
    state.gamedata.id = parent.dataset.id
  }
}

const cellInput = state => e => 
{
  let parent = e.target.parentNode
  let game = state.game
  if (e.target.value.length > 1) {
    e.target.value = e.data
  }
  e.target.value = e.target.value.toLowerCase()
  parent.classList.remove('correct', 'wrong', 'mistake')
  state.gamedata.changed = true
  state.game.actions.check.node.classList.remove('inactive')
  let [x, y] = [+parent.dataset.x + (state.gamedata.dir == 'hor'), +parent.dataset.y + (state.gamedata.dir == 'ver')]
  let nextCell = (game.crosswordField[`crosswordrow${y}`] ?? {})[`cell${y}_${x}`]
  if (nextCell && nextCell.node.classList.contains('char')) {
    nextCell.input.node.focus()
  }
  else {
    state.dir = false
  }
}

const cellKeyDown = state => e => 
{
  let parent = e.target.parentNode
  let game = state.game
  if (e.key == 'Backspace') {
    let [x, y] = [+parent.dataset.x - (state.gamedata.dir == 'hor'), +parent.dataset.y - (state.gamedata.dir == 'ver')]
    let nextCell = (game.crosswordField[`crosswordrow${y}`] ?? {})[`cell${y}_${x}`]
    if (e.target.value == '') {
      if (nextCell && nextCell.node.classList.contains('char')) {
        nextCell.input.node.value = ''
        nextCell.input.node.focus()
      }
    }
    else {
      e.target.value = ''
    }
  }

  if (['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'].indexOf(e.key) !== -1) {
    let [x, y] = [null, null]
    if (e.key == 'ArrowUp') {
      [x, y] = [+parent.dataset.x, (+parent.dataset.y)-1]
    }
    if (e.key == 'ArrowLeft') {
      [x, y] = [(+parent.dataset.x)-1, +parent.dataset.y]
    }
    if (e.key == 'ArrowRight') {
      [x, y] = [(+parent.dataset.x)+1, +parent.dataset.y]
    }
    if (e.key == 'ArrowDown') {
      [x, y] = [+parent.dataset.x, (+parent.dataset.y)+1]
    }
    let nextCell = (game.crosswordField[`crosswordrow${y}`] ?? {})[`cell${y}_${x}`]
    if (nextCell && nextCell.node.classList.contains('char')) {
      nextCell.input.node.focus()
    }
  }
}

const getCellClassName = (cell, crossword, tried, hasGuess, i, c, gameState) =>
  (cell.props.className ? cell.props.className + " " : "")
    + 'char'
    + (c == 0 ? ` ${crossword[`dir${i + 1}`]}` : '')
      + (tried && hasGuess
        ? gameState.results[gameState.attempt][i].res
          ? ' correct'
          : gameState.results[gameState.attempt][i].dif
            ? gameState.results[gameState.attempt][i].dif.indexOf(c) !== -1
              ? ' mistake'
              : ' correct'
            : ' wrong'
        : '')

const getCellChildren = (cell, finished, tried, val, i, c, gameState) =>
({
  ...cell.children ?? {},
  input: {
    props: {
      maxlength: 1,
      pattern: "[a-z]*",
      disabled: finished,
      value: tried
      ? gameState.guesses[gameState.attempt][i][c]
      : val
    }
  }
})

export { cellFocus, cellInput, cellKeyDown, getCellClassName, getCellChildren }
