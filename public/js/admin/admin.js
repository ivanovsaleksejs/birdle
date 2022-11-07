const triggerUpload = (state, target) => event =>
{
  if (input = $('[type=file]', target.closest('.imageupload'))) {
    input.click()
  }
}

const taskImageUpload = (state, target) => event =>
{
  let file = $('.imagefile', target.parentNode).files[0]

  let fd = new FormData()
  fd.append('file', file)

  ajax('/admin/uploadImage', fd, "POST", {'Accept' : '*/*'}, res =>
    {
      res = JSON.parse(res)
      $('[name^=image][type=hidden]', target.parentNode).value = res.newname
      $('img', target.parentNode).src = res.newname
    }
  )
}

const selectGenus = (state, target) => event =>
{
  let birdId = target.id.replace('genus_select_', '')

  let fd = JSON.stringify({
    'genus' : target.selectedOptions[0].value,
    'birdId' : birdId
  })

  ajax('/admin/changegenus/', fd, "POST", {'Content-Type' : "application/json"})
}

const selectCalendar = (state, target) => event =>
{

  let date = $('td',target.closest('tr'))[0].innerText
  let bird_number = $('input',target.closest('tr')).value
  let id = target.id.replace('calendar_task_', '')

  let fd = JSON.stringify({
    'date' : date,
    'bird_number' : bird_number,
    'id' : id,
    'task_id' : target.selectedOptions[0].value
  })
  ajax('/admin/changecalendar/', fd, "POST", {'Content-Type' : "application/json"})
}

