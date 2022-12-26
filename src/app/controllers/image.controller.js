const userService = require('../services/user.service')
const cloudinary = require('../../config/cloudinary')

const loadImage = async (req, res) => {
  const id = req.params.id
  try {
    const userExists = await userService.getUser(id)
    if (!userExists) return res.status(404).json({ message: 'User not found on database' })

    const { path } = req.file
    const options = { use_filename: true, unique_filename: true, overwrite: true, folder: id }
    const { url, secure_url } = await cloudinary.uploader.upload(path, options)
    await userService.updateImage(id, url)
    res.status(200).json({ message: 'Image saved successfully', url })
  } catch (error) {}
}
const getImage = async (req, res) => {}
const deleteImage = async (req, res) => {}

module.exports = { loadImage, getImage, deleteImage }
