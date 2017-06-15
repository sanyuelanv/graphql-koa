'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _mysql = require('../config/mysql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let sequelize = new _sequelize2.default(_mysql.graphql.database, _mysql.graphql.user, _mysql.graphql.password, {
  host: _mysql.graphql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

exports.default = sequelize;