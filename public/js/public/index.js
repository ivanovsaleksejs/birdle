const state = {}

openWS(state)()

state.customEvents = {
  showResult : new Event('showresult', { bubbles : false }),
  showError : new Event('showerror', { bubbles : true }),
  showSuccess : new Event('showsuccess', { bubbles : true }),
  changeTexts : new Event('changetexts', { bubbles : true }),
  renewStats : new Event('renewstats', { bubbles : true }),
}

const events = {
  'keyup' : [
    {
      target : '.guess',
      action : filterBirdnames
    }
  ],
  'click' : [
    {
      target : '.suggestions a.active',
      action : sendGuess,
      checkChilds : true
    },
    {
      target : '.closebutton',
      action : closePopup
    },
    {
      target : '.languageSelect .lang',
      action : showLanguageSelect
    },
    {
      target : '.help',
      action : showHelp
    },
    {
      target : '.terms',
      action : showTerms
    },
    {
      target : '.tax',
      action : showTaxonomy
    },
    {
      target : '.stats',
      action : showStats
    },
    {
      target : '.content',
      action : closeModals
    }
  ],
  'focus' : [
    {
      target : '.guess',
      action : shrinkImage
    }
  ],
  'blur' : [
    {
      target : '.guess',
      action : unshrinkImage
    }
  ],
  'showresult' : [
    {
      target : '.tries',
      action : showResult
    }
  ],
  'showerror' : [
    {
      target : '.game',
      action : showError
    }
  ],
  'showsuccess' : [
    {
      target : '.game',
      action : showSuccess
    }
  ],
  'changetexts' : [
    {
      target : '.game',
      action : changeTexts
    }
  ],
  'renewstats' : [
    {
      target : '.game',
      action : renewStats
    }
  ],
  'change' : [
    {
      target : '.taxonomy_row input[type=checkbox]',
      action : filterTaxonomy,
      checkChilds : true
    }
  ]
}

window.addEventListener('load', _ =>
  {
    initGame(state)
  }
)

addObserver(state, events)
