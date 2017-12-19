import Sequelize from "sequelize";
import { graphql } from '../config/mysql';
let sequelize = new Sequelize(graphql.database, graphql.user, graphql.password, {
  host: graphql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})


export default sequelize;
