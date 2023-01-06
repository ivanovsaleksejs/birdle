const pool = require('../pool.js')

const getTaxonomy = routes => (req, res) => {
  (async _ => {
    const client = await pool.connect()

    const allOrders = []
    const allFamilies = []
    const allSpecies = []
    const allParents = []

    const orders = (await client.query("SELECT * FROM birds_class c WHERE c.parent IS NULL")).rows
    for (let order of orders) {
      allOrders.push({
        id : order.id,
        name : order.name_lv
      })
      allParents.push({
        id : order.id,
        name : order.name_lv
      })
      order.families = (await client.query(
        {
          text : "SELECT * FROM birds_class WHERE parent = $1",
          values : [order.id]
        }
      )).rows

      for (let family of order.families) {
        allFamilies.push({
          id : family.id,
          name : family.name_lv
        })
        allParents.push({
          id : family.id,
          name : family.name_lv
        })
        family.geni = (await client.query(
          {
            text : "SELECT * FROM birds_class WHERE parent = $1",
            values : [family.id]
          }
        )).rows

        for (let genus of family.geni) {
          genus.species = (await client.query(
            {
              text : "SELECT * FROM birds_names WHERE genus = $1",
              values : [genus.id]
            }
          )).rows
          for (let sp of genus.species) {
            allSpecies.push({
              id : sp.id,
              genus_id : genus.id,
              name : sp.name_lv
            })
          }
        }
      }
    }

    client.release()

    res.render('public/taxonomy', {
      page : "taxonomy",
      orders : orders,
      allParents : allParents,
      allOrders : allOrders,
      allFamilies : allFamilies,
      allSpecies : allSpecies
    })
  })()
}

module.exports = { getTaxonomy }

