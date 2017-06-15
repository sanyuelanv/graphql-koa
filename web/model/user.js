'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _mysql = require('../func/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let User = _mysql2.default.define('user', {
  id: {
    type: _sequelize.DataTypes.INTEGER(11),
    primaryKey: true
  },
  name: _sequelize.DataTypes.STRING(45),
  pw: _sequelize.DataTypes.STRING(45),
  salt: _sequelize.DataTypes.STRING(45),
  signTime: _sequelize.DataTypes.STRING(15)
}, {
  freezeTableName: true,
  tableName: 'user',
  timestamps: false,
  'createdAt': false
});

exports.default = User;