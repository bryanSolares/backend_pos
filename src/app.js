const compression = require('compression')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport')
const { PORT } = require('./config/dotenv')
const routes = require('./app/routes/index')

const sequelize = require('./config/database.connect')

const app = express()
app.disable('x-powered-by')
app.set('port', PORT)

app.use(cors())
app.use(helmet())
app.use(passport.initialize())
app.use(compression())
app.use(express.json({ limit: '4mb' }))
app.use(express.urlencoded({ extended: true, limit: '4mb' }))
app.use(morgan('dev'))

app.use('/api', routes)

const startServer = () => {
  app.listen(app.get('port'), async () => {
    console.log('Server online')
    console.log(`Server on port ${app.get('port')}`)
    await sequelize.connectPostgresql()
    ///await sequelize.sequelize.sync({ force: true })
  })
}

const stopServer = () => {}

module.exports = { app }
