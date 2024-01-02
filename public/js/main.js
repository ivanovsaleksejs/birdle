const $ = (s, c, unwrap = true) => (elems = (c ?? document).querySelectorAll(s)).length == 1 && unwrap ? elems[0] : elems

const newEl= (e, params) => Object.assign(document.createElement(e), params)

const addEventsToNodes = events => n =>
{
  for (let eventName in events) {
    Array.from(events[eventName]).map(handler => {
      let nodes = typeof handler.target == 'object'
        ? [handler.target]
        : $(handler.target, null, false)
      for (let node in nodes) {
        if (nodes[node] === n) {
          n.addEventListener(eventName, handler.action(state, n))
        }
        else if (n.childNodes.length > 0 && handler.checkChilds && (index = Array.from(n.childNodes).indexOf(nodes[node])) !== -1) {
          n.childNodes[index].addEventListener(eventName, handler.action(state, n.childNodes[index]))
        }
      }
    })
  }
}

const trackElements = (state, events) => (list, observer) =>
{
  list.map(m => {
    if (m.type == 'childList') {
      Array.from(m.addedNodes).map(addEventsToNodes(events))
    }
  })
}

const addObserver = (state, events) =>
{
  const observer = new MutationObserver(trackElements(state, events))

  observer.observe($('html'), {
    attributes : true,
    childList : true,
    subtree : true
  })
}
