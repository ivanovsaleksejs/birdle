const pool = require('../pool.js')
const { text, texts } = require('../texts.js')

const getTaxonomy = routes => (req, res) => {
  (async _ => {
    const client = await pool.connect()

    const allOrders = []
    const allFamilies = []
    const allSpecies = []
    const allParents = []

    let lang = req.session.lang

    const orders = (await client.query(`SELECT id, name_${lang} as name FROM birds_class c WHERE c.parent IS NULL`)).rows

    for (let order of orders) {
      order.families = (await client.query(
        {
          text : `SELECT id, name_${lang} as name FROM birds_class WHERE parent = $1`,
          values : [order.id]
        }
      )).rows

      for (let family of order.families) {
        family.geni = (await client.query(
          {
            text : `SELECT id, name_${lang} as name FROM birds_class WHERE parent = $1`,
            values : [family.id]
          }
        )).rows

        for (let genus of family.geni) {
          genus.species = (await client.query(
            {
              text : `SELECT id, name_${lang} as name FROM birds_names WHERE genus = $1`,
              values : [genus.id]
            }
          )).rows
        }
      }
    }

    client.release()
    res.render('public/taxonomy', {
      page : "taxonomy",
      orders : orders,
      lang : lang,
      text : text,
    })

    //res.send(JSON.stringify(orders))
  })()
}

module.exports = { getTaxonomy }
