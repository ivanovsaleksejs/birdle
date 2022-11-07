const showError = (state, target) => event =>
{
  showPopup(target, 'error', event.data.errorMessage)
}

const showMessage = (state, target) => event =>
{
  showPopup(target, 'message', event.data.message)
}

const showSuccess = (state, target) => event =>
{
  showPopup(target, 'success', event.data.message)
}

const showPopup = (parent, type, message) =>
{
  if (typeof parent == 'string') {
    parent = $(parent)
  }

  let popup = newEl('div', {
    className : 'popup ' + type,
  })
  parent.appendChild(popup)

  popup.appendChild(newEl('div', {
    className : 'message',
    innerText : message
  }))

  popup.appendChild(newEl('div', {
    className : 'closebutton'
  }))

  setTimeout((popup => _ => {
    popup.addEventListener('transitionend', removeEnlarged())
    popup.classList.add('enlarged')
  })(popup), 100)
}

const removeEnlarged = next => event =>
{
  let target = event.target
  if (target.classList.contains('enlarged')) {
    target.classList.remove('enlarged')
    target.classList.add('loaded')
    target.removeEventListener('transitionend', removeEnlarged)
    if (next instanceof Function) {
      next()
    }
  }
}

const removeChanging = next => event =>
{
  let target = event.target
  if (target.classList.contains('changing')) {
    target.classList.remove('changing')
    target.removeEventListener('transitionend', removeChanging)
  }
  if (next) {
    next()
  }
}

const closePopup = (state, target) => event =>
{
  let popup = target.closest('.popup')
  popup.addEventListener('transitionend', e => e.target.remove())
  popup.classList.remove('loaded')
}

const closeModals = (state, target) => event =>
{
  if (event.srcElement === event.target && ['content', 'game', 'wrapper'].map(c => event.target.classList.contains(c)).some(Boolean)) {
    let popup = Array.from($('.popup.loaded', null, false))
    if (popup.length) {
      for (let p in popup) {
        popup[p].addEventListener('transitionend', e => e.target.remove())
        popup[p].classList.remove('loaded')
      }
    }
    let langSelect = $('.languageSelect.opened', null, false)
    if (langSelect.length) {
      langSelect[0].classList.remove('opened')
    }
  }
}

const showLanguageSelect = (state, target) => event =>
{
  if (!target.classList.contains('active')) {
    let newLang = Array.from(target.classList).at(-1)
    changeLanguage(state, newLang)
  }
  let select = target.closest('.languageSelect')
  select.classList.toggle('opened')
}

const showTerms = state => _ =>
{
  if ($('.termsPopup').length == 0) {
    showPopup('.game', 'termsPopup', '')
    $('.popup.termsPopup .message').appendChild($('.privacy').cloneNode(true))
  }
}

const showHelp = (state, target) => event =>
{
  if ($('.helpPopup').length == 0) {
    showPopup('.game', 'helpPopup', '')
    $('.popup.helpPopup .message').appendChild($('.helptext').cloneNode(true))
  }
}

const showStats = (state, target) => event =>
{
  if ($('.statsPopup').length == 0) {
    showPopup('.game', 'statsPopup', '')
    $('.popup.statsPopup .message').appendChild($('.statsData').cloneNode(true))
  }
}

const showSharePopup = (attempts, birdNumber, name, state) =>
{
  let tweet = text('tweetHeader', state) + birdNumber
  for (let a of attempts) {
    tweet += "\n" + a.map(x => x ? "\u{1F7E9}" : "\u{2B1C}").join('')
  }
  let tries = attempts.length
  let prefix = text(attempts[tries - 1].every(Boolean) ? ('right' + (tries > 5 ? 1 : tries > 3 ? 2 : tries > 1 ? 3 : 4)) : 'defeat', state)
  tweet += "\n" + document.location.origin + " #birdle"
  tweet = encodeURIComponent(tweet)
  tweetMessage = `<p>${prefix} ${text('rightAnswer', state)}</p><p class="rightAnswer">${name}</p><p>${text('share', state)}</p>`
  tweetButton = newEl('a',
    {
      className : 'twitter-share-button',
      target : 'blank',
      href : `https://twitter.com/intent/tweet/?text=${tweet}`,
      innerText : 'Tweet'
    }
  )
  setTimeout(((msg, btn) => _ => {
    showPopup('.game', 'message share', '')
    let popup = $('.popup.share .message')
    popup.innerHTML = msg
    popup.appendChild(newEl('br'))
    popup.appendChild(btn)
  })(tweetMessage, tweetButton), 1500)
}

const changeLanguage = (state, lang) =>
{
  let flag = $('.lang.active')
  let currentLang = Array.from(flag.classList).at(-1)
  flag.classList.remove(currentLang)
  flag.classList.add(lang)
  state.lang = lang
  state.ws.send("CHANGELANG: " + lang)
}

const findById = (list, id) =>
{
  for (let el in list) {
    if (list[el].id == id) {
      return list[el]
    }
  }
}

const changeTexts = (state, target) => event =>
{
  let elems = Array.from($('[data-text]', null, false))
  for (let elem in elems) {
    let code = elems[elem].dataset.text
    let lang = state.lang
    if (code.indexOf('order_') === 0 || code.indexOf('family_') === 0 || code.indexOf('genus_') === 0) {
      elems[elem].innerText = findById(state.geni, code.split('_')[1])['name_' + lang]
    }
    else if (code.indexOf('name_') === 0) {
      elems[elem].innerText = findById(state.birdnames, code.split('_')[1])['name_' + lang]
    }
    else {
      elems[elem].innerText = event.data.data[code] ?? ("_" + code)
    }
    let ps = state.tries ? state.tries > 5 ? 'defeat' : ('placeholder' + state.tries) : 'placeholder0'
    $('.guess').placeholder = event.data.data[ps]
  }
}

const text = (code, state) => state.texts[state.lang][code]

const shrinkImage = (state, target) => event => $('.taskimage').classList.add('shrinked')

const unshrinkImage = (state, target) => event => $('.taskimage').classList.remove('shrinked')
