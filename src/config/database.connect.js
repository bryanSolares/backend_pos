const { Sequelize } = require('sequelize')
const { POSTGRES_USER } = require('./dotenv')
const { POSTGRES_PASSWORD } = require('./dotenv')
const { POSTGRES_DB } = require('./dotenv')
const { POSTGRES_HOST } = require('./dotenv')
const { POSTGRES_PORT } = require('./dotenv')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  pool: {
    min: 10,
    max: 100,
    idle: 30000,
    acquire: 60000
  },
  logging: true
})

const connectPostgresql = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established')
  } catch (error) {
    // TODO: Crear manejador de erress
    console.log(`Error on connection to database: ${error}`)
  }
}

module.exports = { sequelize, connectPostgresql }
