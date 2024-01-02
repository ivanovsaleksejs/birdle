const popup = content => ({
  listeners: {
    popupclose: e => {
      e.target.classList.remove('loaded')
      e.target.classList.add('closed')
    },
    transitionend: e => {
      if (e.target.classList.contains('enlarged')) {
        e.target.classList.remove('enlarged')
        e.target.classList.add('loaded')
      }
      if (e.target.classList.contains('closed')) {
        e.target.remove()
      }
    },
    rendered: e => {
      setTimeout((elem => _ => {
        elem.classList.add('enlarged')
      })(e.target), 10)
    }
  },
  children: {
    content: content,
    closebutton: {
      listeners: {
        click: e => {
          e.target.parentNode.dispatchEvent((new CustomEvent('popupclose')))
        }
      }
    }
  }
})

export default popup
