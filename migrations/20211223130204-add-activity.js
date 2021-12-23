'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('activity', {
    id: {
      type: 'int', 
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
      length: 10
    },
    email: {
      type: 'string', 
      length: 255
    },
    title: {
      type: 'string',
      length: 255,
      notNull: true,
    },
    create_at: {
      type: 'datetime',
    },
    update_at: {
      type: 'datetime',
    },
    delete_at: {
      type: 'datetime',
    }
  });
};

exports.down = function(db) {
  return db.dropTable('activity');
};

exports._meta = {
  "version": 1
};
