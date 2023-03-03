const fs = require('fs')
const { cloudinary } = require('../../config/cloudinary')

const uploadCloud = (path, options) => {
  const reponseUpload = cloudinary.uploader.upload(path, options)
  return reponseUpload
}

const deleteResource = (path) => {
  fs.rmSync(path, { force: true })
}

module.exports = { uploadCloud, deleteResource }
