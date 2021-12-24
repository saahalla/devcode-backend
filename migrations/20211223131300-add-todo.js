'use strict'

var dbm
var type
var seed

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
  return db.createTable('todo', {
    id: {
      type: 'int',
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
      length: 10,
    },
    activity_group_id: {
      type: 'int',
      notNull: true,
      length: 10,
      foreignKey: {
        name: 'activity_group_id',
        table: 'activity',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    title: {
      type: 'string',
      length: 255,
      notNull: true,
    },
    is_active: {
      type: 'boolean',
      defaultValue: 1,
    },
    priority: {
      type: 'string',
      length: 255,
      notNull: true,
      defaultValue: 'very-high',
    },
    create_at: {
      type: 'string',
      length: 64,
    },
    update_at: {
      type: 'string',
      length: 64,
    },
    delete_at: {
      type: 'string',
      length: 64,
    },
  })
}

exports.down = function (db) {
  return db.dropTable('todo')
}

exports._meta = {
  version: 1,
}
