const compression = require('compression')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport')
const { PORT } = require('./config/dotenv')
const routes = require('./app/routes/index')

const sequelize = require('./config/database.connect')

let server
const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(helmet())
app.use(passport.initialize())
app.use(compression())
app.use(express.json({ limit: '4mb' }))
app.use(express.urlencoded({ extended: true, limit: '4mb' }))
app.use(morgan('dev'))

app.use('/api', routes)

const listen = () =>
  new Promise((resolve) => {
    server = app.listen(PORT, async () => {
      console.log('Server online')
      console.log(`Server on port ${PORT}`)
      await sequelize.connectPostgresql()
      // await sequelize.sequelize.sync({ force: true })
      resolve()
    })
  })

const stop = () =>
  new Promise((resolve, reject) => {
    if (server) {
      server.close((error) => {
        if (error) {
          reject()
          console.log('Error al cerrar servidor')
        }
      })
    }

    if (sequelize.sequelize) {
      sequelize.sequelize.close()
    }

    resolve()
  })

module.exports = {
  listen,
  stop,
  server,
  app
}
