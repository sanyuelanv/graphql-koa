import {
  DataTypes
} from "sequelize";
import sequelize from '../func/mysql';

let User = sequelize.define(
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

export default User;
