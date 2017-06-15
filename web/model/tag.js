'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _mysql = require('../func/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Tag = _mysql2.default.define('tag', {
  id: {
    type: _sequelize.DataTypes.INTEGER(11),
    primaryKey: true
  },
  name: _sequelize.DataTypes.STRING(45),
  tagnumber: _sequelize.DataTypes.INTEGER(11)
}, {
  freezeTableName: true,
  timestamps: false
});

exports.default = Tag;