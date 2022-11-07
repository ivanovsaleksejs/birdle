/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    login: { type: 'varchar(200)', notNull: true },
    password: { type: 'varchar(200)', notNull: true },
    admin: { type: 'boolean', default: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('users')
}
