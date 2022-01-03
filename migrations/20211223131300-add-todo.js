'use strict'

let dbm
let type
let seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function (db) {
  return db.createTable('todos', {
    id: {
      type: 'smallint',
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    activity_group_id: {
      type: 'smallint',
      notNull: true,
      foreignKey: {
        name: 'activity_group_id',
        table: 'activities',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    title: {
      type: 'char',
      length: 64,
      notNull: true,
    },
    is_active: {
      type: 'boolean',
      defaultValue: true,
    },
    priority: {
      type: 'char',
      length: 16,
      notNull: true,
      defaultValue: 'very-high',
    },
    create_at: {
      type: 'char',
      length: 32,
    },
    update_at: {
      type: 'char',
      length: 32,
    },
    delete_at: {
      type: 'char',
      length: 32,
    },
  })
}

exports.down = function (db) {
  return db.dropTable('todos')
}

exports._meta = {
  version: 1,
}
