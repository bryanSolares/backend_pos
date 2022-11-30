const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../../.env') })

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGOULR: process.env.URL_MONGO,
  MONGO_DATABASE_NAME: process.env.DATABASE_NAME,
  ENV: process.env.NODE_ENV,
  TOKEN_EXPIRATION: process.env.JWT_EXPIRATION,
  SECRET_KEY: process.env.JWT_SECRET_KEY
}
