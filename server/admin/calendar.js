const pool = require('../pool.js')

const showCalendar = routes => (req, res) =>
{
  (async _ =>
    {
      const { types } = require('pg')
      types.setTypeParser(1082, v => v)

      const client = await pool.connect()

      const taskWithBirdName = (await client.query(`SELECT t.id as task_id, tt.bird_number as bird_number, tt.id as id, tt.date as date, b.name_lv 
          FROM birds_tasks t 
          LEFT JOIN daily_tasks tt ON tt.task_id = t.id 
          LEFT JOIN birds_names b ON b.id = t.bird_id`
      )).rows

      client.release()

      let tasksByDate = {} 
      for (let r in taskWithBirdName) {
        tasksByDate[taskWithBirdName[r].date] = taskWithBirdName[r]
      }

      const n = Date.now()
      let dates = []
      let date = null
      for (let i of [...Array(31).keys()]) {
        date = (new Date(n + i*86400000)).toLocaleString('fr-CA', { timeZone: 'Europe/Riga', year: 'numeric', month: '2-digit', day: '2-digit'})
        dates[i] = {
          date : date,
          dailyTaskId : typeof tasksByDate[date] !== 'undefined' ? tasksByDate[date].id : 0,
          taskId :  typeof tasksByDate[date] !== 'undefined' ? tasksByDate[date].task_id : 0,
          bird_number : typeof tasksByDate[date] !== 'undefined' ? tasksByDate[date].bird_number : 0
        }
      }

      res.render('admin/calendar', {
        title : 'Calendar',
        dates : dates,
        taskWithBirdName : taskWithBirdName,
        routes : routes
      })
    }
  )()
}

const changeCalendar = routes => (req, res) =>
{
  (async _ =>
    {
      const date = req.body.date
      const taskId = req.body.task_id
      const id = req.body.id ?? null
      const birdNumber = req.body.bird_number ?? id
      if (birdNumber == null) {
        birdNumber = 0
      }

      const client = await pool.connect()

      if (taskId > 0) {
        if (id > 0) {
          await client.query({
            name : "daily_task_update",
            text : "UPDATE daily_tasks SET date = $1, task_id = $2, bird_number = $3 WHERE id = $4",
            values : [date, taskId, birdNumber,  id]
          })
        }
        else {
          await client.query({
            name : "daily_task_insert",
            text : "INSERT INTO daily_tasks (date, task_id, bird_number) VALUES ($1, $2, $3)",
            values : [date, taskId, birdNumber]
          })
        }
      }
      else {
        await client.query({
          name : "delete_from_daily_tasks",
          text : "DELETE FROM daily_tasks WHERE id = $1",
          values : [ id ]
        })
      }

      client.release()

      res.json({ status : 'OK' })
    }
  )()
}

module.exports = { showCalendar, changeCalendar }
