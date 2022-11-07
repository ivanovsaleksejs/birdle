const Ajax = {
  request : (url, params) =>
  {

    let headers = {
      ...{
        /*"Accept" : "application/json",
        "X-CSRF-TOKEN" : $('meta[name="csrf-token"]').content,
        "X-Requested-With" : "XMLHttpRequest"*/
      },
      ...params.headers
    }

    params.headers = headers

    params = {
      ...{
        nocache : false,
        method : "GET",
        origin : document.location.origin,
        data : {},
        callback : _ => {}
      },
      ...params
    }

    let xmlhttp = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP")

    xmlhttp.onreadystatechange = Ajax.stateChange(params.callback)

    let urlObject = new URL(url, params.origin)

    if (params.nocache) {
      let d = new Date
      params.nocache = d.getTime() + Math.round(d.getMilliseconds() / 100)
    }

    if (params.method == "GET") {
      for (let param in params.data) {
        urlObject.searchParams.set(param, params.data[param])
      }
    }

    url = urlObject.href

    return Ajax.send(xmlhttp, url, params)
  },

  send : (xmlhttp, url, params) =>
  {
    xmlhttp.open(params.method, url, params.async)

    for (let h in params.headers) {
      xmlhttp.setRequestHeader(h, params.headers[h])
    }

    xmlhttp.send(params.data)
    return xmlhttp
  },

  stateChange : callback => e =>
  {
    if (e.target.readyState == 4 && e.target.status == 200){
      callback(e.target.response)
    }
  }
}

const ajax = (url, data, method, headers, callback, errorCallback) =>
{
  callback = callback && typeof callback == "function"
    ? callback
    : (_ => {})

  errorCallback = errorCallback && typeof errorCallback == "function"
    ? errorCallback
    : (_ => {})

  Ajax.request(url, {
    data: data,
    method: method ? method : 'GET',
    callback: callback,
    headers: headers
  })

  return false
}
