const { DataTypes } = require('sequelize')
const { dbInstance } = require('../config/mysql')
let dbModel = {}
dbModel.user = dbInstance.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement:true,
    },
    name: DataTypes.STRING(45),
    pw: DataTypes.STRING(45),
  },
  {
    freezeTableName: true,
    tableName:'user',
    timestamps: false,
    'createdAt': false,
  }
);
module.exports = dbModel
