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
  return null;
};

exports.down = function(db) {
  return db.removeForeignKey('todo', 'activity_group_id',
  {
    dropIndex: true,
  })
};

exports._meta = {
  "version": 1
};
