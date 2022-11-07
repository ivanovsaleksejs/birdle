/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('birds_tasks', {
    id: 'id',
    bird_id: { type: 'integer', notNull: true },
    image1: { type: 'varchar(200)', notNull: true },
    image2: { type: 'varchar(200)', notNull: true },
    image3: { type: 'varchar(200)', notNull: true },
    image4: { type: 'varchar(200)', notNull: true },
    image5: { type: 'varchar(200)', notNull: true },
    image6: { type: 'varchar(200)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  }, {
    constraints: {
      foreignKeys : [
        {
          columns: 'bird_id',
          references: 'birds_names(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      ]
    }
  })
}

exports.down = pgm => {
  pmg.dropTable('birds_tasks')
}
