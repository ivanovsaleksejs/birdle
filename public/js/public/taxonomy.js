const filterTaxonomy = (state, target) => event =>
{
  let checked = event.target.checked
  let children = event.target.closest('.taxonomy_row').querySelectorAll(':scope > div')[1]
  $('input[type=checkbox]', children, false).forEach(e => e.checked = checked)
}
