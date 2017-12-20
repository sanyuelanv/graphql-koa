const Sequelize = require('sequelize');
const { graphql } = require('../config/mysql');
let testDB = new Sequelize(graphql.database, graphql.user, graphql.password, {
  host: graphql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})


module.exports = {testDB};
