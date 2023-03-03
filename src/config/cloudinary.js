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

const optionsProfilePhotoUpload = (id) => ({
  use_filename: true,
  unique_filename: true,
  overwrite: true,
  folder: 'profiles',
  public_id: `profile_${id}`
})

module.exports = { cloudinary, optionsProfilePhotoUpload }
