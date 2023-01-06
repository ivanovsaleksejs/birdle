const filterTaxonomy = (state, target) => event => {
  $('input[type=checkbox]:checked', $('.taxonomy_column')[0]).forEach(e => console.log(e.dataset.id))
}
