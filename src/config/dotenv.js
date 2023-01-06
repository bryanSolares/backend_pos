const path = require('path')
const fs = require('fs')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const privateKey = fs.readFileSync(path.join(__dirname, './jwt/private.key'), 'utf-8')
const publicKey = fs.readFileSync(path.join(__dirname, './jwt/private.key.pub'), 'utf-8')

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGOULR: process.env.URL_MONGO,
  MONGO_DATABASE_NAME: process.env.DATABASE_NAME,
  ENV: process.env.NODE_ENV,
  TOKEN_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_PRIVATE_KEY: privateKey,
  JWT_PUBLIC_KEY: publicKey,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_APIKEY: process.env.CLOUD_APIKEY,
  CLOUD_SECRETEKEY: process.env.CLOUD_SECRETEKEY
}
