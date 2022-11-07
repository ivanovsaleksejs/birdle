/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('daily_tasks', {
    id: 'id',
    date: {type: 'date', notNull: true},
    task_id: {type: 'integer', notNull: true},
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  }, {
    constraints: {
      foreignKeys : [
        {
          columns: 'task_id',
          references: 'birds_tasks(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      ]
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('daily_tasks')
}
