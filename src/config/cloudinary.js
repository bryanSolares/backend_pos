const cloudinary = require('cloudinary').v2
const { CLOUD_NAME } = require('./dotenv')
const { CLOUD_APIKEY } = require('./dotenv')
const { CLOUD_SECRETEKEY } = require('./dotenv')

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_APIKEY,
  api_secret: CLOUD_SECRETEKEY,
  secure: true
})

module.exports = cloudinary
