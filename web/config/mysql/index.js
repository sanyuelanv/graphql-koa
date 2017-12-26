import Sequelize from "sequelize";
import { db } from './config';
let dbInstance = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})
module.exports = { dbInstance }
