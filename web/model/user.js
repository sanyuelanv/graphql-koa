const {DataTypes} = require('sequelize')
const {testDB} = require('../func/mysql');

let userModel = testDB.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true
    },
    name: DataTypes.STRING(45),
    pw: DataTypes.STRING(45),
    salt: DataTypes.STRING(45),
    signTime: DataTypes.STRING(15),
  },
  {
    freezeTableName: true,
    tableName:'user',
    timestamps: false,
    'createdAt': false,
  }
);
module.exports = {userModel}
