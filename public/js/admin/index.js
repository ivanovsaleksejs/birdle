const events = {
  'click' : [
    {
      target : '.imageupload',
      action : triggerUpload
    }
  ],
  'change' : [
    {
      target : '.genus_select',
      action : selectGenus
    },
    {
      target : '.calendar_task',
      action : selectCalendar
    },
    {
      target : '.imagefile',
      action : taskImageUpload
    }
  ]
}

const state = {}

addObserver(state, events)
