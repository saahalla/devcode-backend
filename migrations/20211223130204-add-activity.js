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
  return db.createTable('activities', {
    id: {
      type: 'smallint',
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: 'char',
      length: 128,
    },
    title: {
      type: 'char',
      length: 128,
      notNull: true,
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
  return db.dropTable('activities')
}

exports._meta = {
  version: 1,
}
