const taxonomy = taxonomy => ({
  children: Object.fromEntries(
    Array.from(taxonomy, e => [`order_${e.id}`, {

    }])
  )
})

const filterTaxonomy = (state, target) => event =>
{
  console.log("ble")
  let checked = event.target.checked
  let children = event.target.closest('.taxonomy_row').querySelectorAll(':scope > div')[1]
  $('input[type=checkbox]', children, false).forEach(e => e.checked = checked)
}

const showTaxonomy = (state, target) => event =>
{
  ajax('/taxonomy', {}, 'GET', {}, res => {
    showPopup('.game', 'taxPopup', '')
    $('.popup.taxPopup .message').innerHTML = res
  })
}
