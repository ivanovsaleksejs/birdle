const WS = {
  open : state => event => {
    getStats(state)
  },

  message : state => event =>
  {
    let data = JSON.parse(event.data ?? "{}")
    state.customEvents[data.event].data = data
    $(data.target).dispatchEvent(state.customEvents[data.event])
  }
}

const openWS = state => _ =>
{
  const ws = new WebSocket((document.location.protocol == 'https:' ? 'wss' : 'ws') + '://' + document.location.host + '/ws')

  ws.addEventListener('open', WS.open(state))

  ws.addEventListener('message', WS.message(state))

  ws.addEventListener('close', openWS(state))

  state.ws = ws
}
