import element from './element.js'
import popup from './templates/popup.js'

const openPopup = (content, state) =>
{
  if (state.game.popup) {
    state.game.popup.node.classsList.add('closed')
  }
  element(popup(content)).appendTo(state.game, 'popup')
}

export default openPopup
