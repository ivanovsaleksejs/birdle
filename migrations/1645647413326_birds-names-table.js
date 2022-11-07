/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('birds_class', {
    id: 'id',
    name_en: { type: 'varchar(200)', notNull: true },
    name_lv: { type: 'varchar(200)', notNull: true },
    name_ru: { type: 'varchar(200)', notNull: true },
    parent: { type: 'integer', notNull: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }

  }, {
    constraints: {
      foreignKeys : [
        {
          columns: 'parent',
          references: 'birds_class(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      ]
    }
  })
  pgm.createTable('birds_names', {
    id: 'id',
    name_en: { type: 'varchar(200)', notNull: true },
    name_lv: { type: 'varchar(200)', notNull: true },
    name_lat: { type: 'varchar(200)', notNull: true },
    name_ru: { type: 'varchar(200)', notNull: true },
    genus: { type: 'integer', notNull: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  }, {
    constraints: {
      foreignKeys : [
        {
          columns: 'genus',
          references: 'birds_class(id)',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      ]
    }
  })
  pgm.createIndex('birds_names', 'name_en')
  pgm.createIndex('birds_names', 'name_lv')
  pgm.createIndex('birds_names', 'name_lat')
  pgm.createIndex('birds_names', 'name_ru')
};

exports.down = pgm => {
  pgm.dropTable('birds_names')
  pgm.dropTable('birds_class')
};
