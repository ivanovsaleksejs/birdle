const pool = require('../pool.js')

const showTasks = routes => (req, res) =>
{
  (async _ => 
    {
      const client = await pool.connect()

      const tasks = (await client.query("SELECT t.*, b.name_lv FROM birds_tasks t LEFT JOIN birds_names b ON b.id = t.bird_id")).rows

      const birds = (await client.query("SELECT * FROM birds_names")).rows

      client.release()

      res.render('admin/tasks', {
        title : 'Tasks list',
        tasks : tasks,
        birds : birds,
        routes : routes
      })
    }
  )()
}

const showTask = routes => (req, res) =>
{
  (async _ => 
    {
      const client = await pool.connect()
      const taskId = req.params.taskId
      const taskRecord = await client.query({
        text : "SELECT t.*, b.name_lv FROM birds_tasks t LEFT JOIN birds_names b ON b.id = t.bird_id WHERE t.id = $1", 
        values : [taskId]
      })
      const birds = (await client.query("SELECT * FROM birds_names")).rows

      client.release()

      res.render('admin/task', {
        title : 'Task edit',
        task : taskRecord.rows[0],
        birds : birds,
        routes : routes
      })
    }
  )()
}

const uploadImage = routes => (req, res) =>
{
  (async _ =>
    {
      let formidable = require('formidable')
      let fs = require('fs')
      let crypto = require('crypto')

      let form = new formidable.IncomingForm()

      let extensions = {
        "image/jpeg" : '.jpg'
      }

      form.parse(req, function (error, fields, file) {
        let newname = crypto
                        .createHash('sha256')
                        .update(file.file.newFilename)
                        .digest('hex') + extensions[file.file.mimetype]
        let filepath = file.file.filepath
        let newpath = __dirname + '/../../public/images/tasks/' + newname

        fs.rename(filepath, newpath, function () {
          res.write(JSON.stringify({
            newname : '/images/tasks/' + newname
          }))
          res.end()
        })
      })
    }
  )()
}

const saveTask = routes => (req, res) =>
{
  (async _ =>
    {
      const birdId  = req.body.bird_id
      const taskId  = req.body.task_id ?? false
      const image1 = req.body.image1
      const image2 = req.body.image2
      const image3 = req.body.image3
      const image4 = req.body.image4
      const image5 = req.body.image5
      const image6 = req.body.image6

      const client = await pool.connect()


      if (taskId) {
        await client.query({
          name : "task_update",
          text : "UPDATE birds_tasks SET bird_id = $1, image1 = $2, image2 = $3, image3 = $4, image4 = $5, image5 = $6, image6 = $7 WHERE id = $8",
          values : [birdId, image1, image2, image3, image4, image5, image6, taskId]
        })
      }
      else {
        await client.query({
          name : "baseimage_insert",
          text : "INSERT INTO birds_tasks (bird_id, image1, image2, image3, image4, image5, image6) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          values : [birdId, image1, image2, image3, image4, image5, image6]
        })
      }

      client.release()

      res.redirect(routes.admin.tasks.url)
    }
  )()
}

const viewStats = routes => (req, res) =>
{
  (async _ => 
    {
      const client = await pool.connect()

      const stats = (await client.query("SELECT * from stats ORDER BY id")).rows

      client.release()

      res.render('admin/stats', {
        title : 'Stats',
        stats : stats,
        routes : routes
      })
    }
  )()
}

module.exports = { showTasks, showTask, saveTask, uploadImage, viewStats }
