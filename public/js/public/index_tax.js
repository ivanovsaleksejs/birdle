const state = {}

const events = {
  'change' : [
    {
      target : '.taxonomy_row input[type=checkbox]',
      action : filterTaxonomy
    }
  ]
}

addObserver(state, events)

