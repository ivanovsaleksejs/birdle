/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.addColumns('daily_tasks', {
    bird_number: { type: 'integer', notNull: false }
  })
  pgm.sql(`UPDATE daily_tasks SET bird_number = id`)
}

exports.down = pgm => {
  pgm.dropColumns('bird_number')
}
