const pool = require('../pool.js')

const showClasses = routes => (req, res) => 
{
  (async _ => 
    {
      const client = await pool.connect()
      const allOrders = []
      const allFamilies = []
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
            name : ' ↳ ' + family.name_lv
          })
          family.geni = (await client.query(
            {
              text : "SELECT * FROM birds_class WHERE parent = $1",
              values : [family.id]
            }
          )).rows
        }
      }

      client.release()

      res.render('admin/classes', {
        title : 'Classes list',
        orders : orders,
        allOrders : allOrders,
        allFamilies : allFamilies,
        allParents : allParents,
        routes : routes
      })
    }
  )()
}

const showClass = routes => (req, res) =>
{
  (async _ =>
    {
      const classId = req.params.classId

      const client = await pool.connect()

      const allParents = await client.query({
        text : "SELECT id, name_lv FROM birds_class"
      })
      const classRecord = await client.query({
        text : "SELECT * FROM birds_class WHERE id = $1",
        values : [classId]
      })

      client.release()

      res.render('admin/class', {
        title : 'Class edit',
        classData : classRecord.rows[0],
        allParents : allParents.rows,
        routes : routes
      })
    }
  )()
}

const saveClass = routes => (req, res) =>
{
  (async _ =>
    {
      const classId = req.body.classId
      const name_en = req.body.name_en
      const name_lv = req.body.name_lv
      const name_ru = req.body.name_ru
      const parent  = req.body.parent || null

      const client = await pool.connect()

      if (classId) {
        await client.query({
          text : "UPDATE birds_class SET name_en = $1, name_lv = $2, name_ru = $3, parent = $4 WHERE id = $5",
          values : [name_en, name_lv, name_ru, parent, classId]
        })
      }
      else {
        await client.query({
          text : "INSERT INTO birds_class (name_en, name_lv, name_ru, parent) VALUES ($1, $2, $3, $4)",
          values : [name_en, name_lv, name_ru, parent]
        })
      }

      client.release()

      res.redirect(routes.admin.classes.url)
    }
  )()
}

const saveParentClass = routes => (req, res) =>
{
  (async _ => 
    {
      const classId = req.body.classId
      const parentId = req.body.parentId
      const client = await pool.connect()

      if (classId) {
        await client.query({
          name: "class_update",
          text: "UPDATE birds_class SET parent = $1 WHERE id = $2",
          values: [parentId, classId]
        })
      }

      client.release()

      res.redirect(routes.admin.classes.url)
    }
  )()
}

module.exports = { showClasses, showClass, saveClass, saveParentClass }
