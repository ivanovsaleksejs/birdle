/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('stats', {
    id: 'id',
    uuid: { type: 'varchar(200)', notNull: true },
    stats1: { type: 'integer', default: 0 },
    stats2: { type: 'integer', default: 0 },
    stats3: { type: 'integer', default: 0 },
    stats4: { type: 'integer', default: 0 },
    stats5: { type: 'integer', default: 0 },
    stats6: { type: 'integer', default: 0 },
    successes: { type: 'integer', default: 0 },
    fails: { type: 'integer', default: 0 }
  })
}

exports.down = pgm => {
  pgm.dropTable('stats')
}
