const compression = require('compression')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const { PORT } = require('./config/dotenv')
const routes = require('./app/routes/index')

const app = express()
app.set('port', PORT)

app.use(cors())
app.use(compression())
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true, limit: '20mb' }))
app.use(morgan('dev'))

app.use('/api', routes)

app.listen(app.get('port'), () => {
  console.log('Server online')
})

module.exports = app
