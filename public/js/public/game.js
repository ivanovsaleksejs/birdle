const initGame = state =>
{
  getBirdNames(state, data =>
    {
      let tries = $('.tries .try', null, false)
      for (let tryEl of Array.from(tries)) {
        for (let elem of Array.from($('.tryel', tryEl))) {
          let list = elem.dataset.text.indexOf('name') !== -1
            ? state.birdnames
            : state.geni

          elem.innerText = findById(list, elem.dataset.text.split('_')[1])['name_' + state.lang]
        }
        animateGuesses.apply(null, $('.tryel', tryEl))
      }
      if (data.attemptIds) {
        state.attemptIds = data.attemptIds
      }
      if (data.attempts) {
        state.attempts = data.attempts
        if (data.attempts.length >=6 || data.success) {
          showSharePopup(data.attempts, data.birdNumber ?? data.taskId, data.correctName, state)
        }
      }
    }
  )
}

const getBirdNames = (state, callback) =>
  ajax('/getbirdnames', {}, 'GET', {}, res =>
    {
      data = JSON.parse(res)
      state.birdnames = data.birdnames.map(n => ({
        ...n,
        sname_en : simplifyString(n.name_en),
        sname_lv : simplifyString(n.name_lv),
        sname_lat : simplifyString(n.name_lat),
        sname_ru : simplifyString(n.name_ru)
      }))
      state.geni = data.geni
      state.lang = data.lang
      state.texts = data.texts
      callback(data)
    }
  )

const simplifyString = s => /^\p{Script=Cyrillic}+$/u.test(s = s.toLowerCase().trim()) ? s : s.normalize('NFKD').replace(/[^\w]/g, '')

const filterBirdnames = (state, target) => event =>
{
  let guess = simplifyString(target.value)
  let names = []
  $('.suggestions').innerHTML = ''
  if (guess != '') {
    for (let bird of state.birdnames) {
      names = names.concat([
        {name : bird.name_lv, sname : bird.sname_lv, id : bird.id},
        {name : bird.name_en, sname : bird.sname_en, id : bird.id},
        {name : bird.name_lat, sname : bird.sname_lat, id : bird.id},
        {name : bird.name_ru, sname : bird.sname_ru, id : bird.id}
      ]
        .filter(s => s.sname.indexOf(guess) !== -1))
    }
    names = names.sort((a, b) => a.sname.indexOf(guess) - b.sname.indexOf(guess))
    let sug = newEl('div',
      {
        className : 'suggestions'
      }
    )
    for (let s of names) {
      if (s) {
        let a = newEl('a', {
          innerText : s.name,
          className : state.attemptIds.some(a => a[3] == s.id) ? 'inactive' : 'active'
        })
        a.dataset.bird_id = s.id
        sug.appendChild(a)
      }
    }
    $('.guesses').replaceChild(sug, $('.guesses .suggestions'))
    $('.suggestions').style.display = names.length ? 'flex' : 'none'
  }
  else {
    $('.suggestions').style.display = 'none'
  }
}

const sendGuess = (state, target) => event =>
{
  let birdId = target.dataset.bird_id

  state.ws.send("GUESS: " + birdId)
}

const getStats = (state, callback) =>
{
  state.ws.send("GETSTATS: ")
}

const renewStats = (state, target) => event =>
{
  let total = event.data.data.total
  let successes = event.data.data.successes
  let max = Math.max.apply(null, [...Array(6).keys()].map(x=>event.data.data['stats' + (x+1)]))
  for (let stat in event.data.data) {
    $('.stats-' + stat + ' .progressbar').value = ((event.data.data[stat] || 0) / (stat == 'successes' ? (total || 1) : (max || 1))) * 100
    $('.stats-' + stat + ' .value').innerText = event.data.data[stat]
  }
  if ($('.popup.statsPopup', null, false).length > 0) {
    $('.popup.statsPopup .message').innerText = ''
    $('.popup.statsPopup .message').appendChild($('.statsData').cloneNode(true))
  }
}

const animateGuesses = (orderEl, familyEl, genusEl, nameEl) =>
{
  let g = p => p.classList.add('enlarged')
  let f = (p, c) => p.addEventListener('transitionend', removeEnlarged(c && (_ => g(c))))

  setTimeout(_ => {
    f(orderEl, familyEl)
    f(familyEl, genusEl)
    f(genusEl, nameEl)
    f(nameEl)
    g(orderEl)
  }, 100)
}

const showResult = (state, target) => event =>
{
  $('.guess').value = ''

  $('.suggestions').innerHTML = ''
  $('.suggestions').style.display = 'none'

  let data = event.data
  let tryEl = newEl('div', {
    className : 'try'
  })

  let orderEl = newEl('div', {
    className : 'tryel ' + (data.orderGuessed ? 'correct' : 'incorrect'),
    innerText : data.order
  })
  orderEl.dataset.text = 'order_' + data.orderId
  tryEl.appendChild(orderEl)

  let familyEl = newEl('div', {
    className : 'tryel ' + (data.familyGuessed ? 'correct' : 'incorrect'),
    innerText : data.family
  })
  familyEl.dataset.text = 'family_' + data.familyId
  tryEl.appendChild(familyEl)

  let genusEl = newEl('div', {
    className : 'tryel ' + (data.genusGuessed ? 'correct' : 'incorrect'),
    innerText : data.genus
  })
  genusEl.dataset.text = 'genus_' + data.genusId
  tryEl.appendChild(genusEl)

  let nameEl = newEl('div', {
    className : 'tryel ' + (data.result ? 'correct' : 'incorrect'),
    innerText : data.name
  })
  nameEl.dataset.text = 'name_' + data.nameId
  tryEl.appendChild(nameEl)

  animateGuesses(orderEl, familyEl, genusEl, nameEl)

  let resText = (l = [data.orderGuessed, data.familyGuessed, data.genusGuessed, data.result].filter(Boolean)).length > 3
    ? text('right' + (data.tries < 2 ? 4 : data.tries < 4 ? 3 : data.tries < 6 ? 2 :1), state)
    : text(data.tries > 5 ? 'defeat' : ('wrong' + (l.length + 1)), state)

  $('.taskimageWrapper .resultMessage').innerText = resText
  $('.taskimageWrapper').classList.add(data.result ? 'correct' : 'wrong')

  if (!data.result && data.tries < 6) {
    if (state.resultTimeout) {
      clearTimeout(state.resultTimeout)
    }
    state.resultTimeout = setTimeout(_ => $('.taskimageWrapper').classList.remove('wrong'), 1500)
  }
  state.tries = data.tries
  state.attemptIds = data.attemptIds

  if (data.nextImage) {
    $('.taskimage').addEventListener('transitionend', removeChanging(
      ((image, src) => _ => image.src = src)($('.taskimage'), data.nextImage)
    ))
    $('.taskimage').classList.add('changing')
  }

  if (data.result || data.tries > 5) {
    if (data.attempts && data.attempts.length) {
      showSharePopup(data.attempts, data.birdNumber ?? data.taskId, data.correctName, state)
    }
    $('.guess').disabled = true
    $('.guess').placeholder = resText
    getStats(state)
  }
  else {
    $('.guess').placeholder = text('placeholder' + state.tries, state)
  }

  $('.tries').appendChild(tryEl)
}
