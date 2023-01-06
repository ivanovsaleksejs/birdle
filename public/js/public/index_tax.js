const state = {}

const events = {
  'change' : [
    {
      target : '.taxonomy_column input[type=checkbox]',
      action : filterTaxonomy
    }
  ]
}

addObserver(state, events)

