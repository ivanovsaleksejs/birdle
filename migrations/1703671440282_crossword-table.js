/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('crosswords', {
    id: 'id',
    date: {type: 'date', notNull: true},
    lang: {type: 'string', notNull: true},
    task_id1: {type: 'integer', notNull: true},
    task_id2: {type: 'integer', notNull: true},
    task_id3: {type: 'integer', notNull: true},
    task_id4: {type: 'integer', notNull: true},
    task_id5: {type: 'integer', notNull: true},
    task_id6: {type: 'integer', notNull: true},
    offset1: {type: 'integer', notNull: true},
    offset2: {type: 'integer', notNull: true},
    offset3: {type: 'integer', notNull: true},
    offset4: {type: 'integer', notNull: true},
    offset5: {type: 'integer', notNull: true},
    offset6: {type: 'integer', notNull: true},
    vertoffset1: {type: 'integer', notNull: true},
    vertoffset2: {type: 'integer', notNull: true},
    vertoffset3: {type: 'integer', notNull: true},
    vertoffset4: {type: 'integer', notNull: true},
    vertoffset5: {type: 'integer', notNull: true},
    vertoffset6: {type: 'integer', notNull: true},
    dir1: {type: 'string', notNull: true},
    dir2: {type: 'string', notNull: true},
    dir3: {type: 'string', notNull: true},
    dir4: {type: 'string', notNull: true},
    dir5: {type: 'string', notNull: true},
    dir6: {type: 'string', notNull: true},
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  }, {
    constraints: {
      foreignKeys : [
        {
          columns: 'task_id1',
          references: 'birds_tasks(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          columns: 'task_id2',
          references: 'birds_tasks(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          columns: 'task_id3',
          references: 'birds_tasks(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          columns: 'task_id4',
          references: 'birds_tasks(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          columns: 'task_id5',
          references: 'birds_tasks(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          columns: 'task_id6',
          references: 'birds_tasks(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      ]
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('crosswords')
};
