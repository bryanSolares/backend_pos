/* eslint camelcase: ["off", {properties: "never"}]*/

const userService = require('../services/user')
const { optionsProfilePhotoUpload } = require('../../config/cloudinary')
const uploadService = require('../services/upload')
const STATUS = require('../../config/statusCodes')

const createUser = async (req, res) => {
  const userData = req.body

  try {
    const userExists = await userService.getUser(userData.cod_user)
    if (userExists) {
      return res
        .status(STATUS.HTTP_BAD_REQUEST)
        .json({ message: 'User already, please try new cod_user' })
    }
    const { status, image, cod_user, name, lastname, email, phone } =
      await userService.createUser(userData)
    return res.status(STATUS.HTTP_CREATED).json({
      message: 'User created successfully',
      user: {
        cod_user,
        name,
        lastname,
        email,
        phone,
        status,
        image
      }
    })
  } catch (error) {
    // TODO: Error personalizado
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on create user', error })
  }
}

const updateUser = async (req, res) => {
  const userData = req.body
  const { id } = req.params
  try {
    const userExists = await userService.getUser(id)
    if (!userExists) {
      return res
        .status(STATUS.HTTP_NOT_FOUND)
        .json({ message: 'User not found on database' })
    }
    await userService.updateUser(id, userData)
    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'User updated successfully' })
  } catch (error) {
    // TODO: Error personalizado
    return res
      .status(STATUS.HTTP_BAD_REQUEST)
      .json({ message: 'Error on update user', error })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await userService.getUser(id)
    if (!user || Object.entries(user).length === 0 || user.deleted === true) {
      return res
        .status(STATUS.HTTP_NOT_FOUND)
        .json({ message: 'User not found on database' })
    }
    await userService.deleteUser(id)

    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'User deleted successfully' })
  } catch (error) {
    // TODO: Error personalizado
    return res
      .status(STATUS.HTTP_BAD_REQUEST)
      .json({ message: 'Error on delete user', error })
  }
}

const getUser = async (req, res) => {
  const idUser = req.params.id

  try {
    const user = await userService.getUser(idUser, [
      'password',
      'deleted',
      'createdAt',
      'updatedAt'
    ])
    return res.status(STATUS.HTTP_OK).json({ message: '_', user })
  } catch (error) {
    // TODO: Error personalizado
    return res
      .status(STATUS.HTTP_BAD_REQUEST)
      .json({ message: 'Error on search user', error })
  }
}

const getAllUsers = async (req, res) => {
  const { limit, page } = req.query
  try {
    if ((limit && isNaN(limit)) || (page && isNaN(page))) {
      return res
        .status(STATUS.HTTP_NOT_FOUND)
        .json({ message: 'The query limit or page is not valid' })
    }

    const dataUsers = await userService.getAllUsers(page, limit, [
      'password',
      'deleted',
      'createdAt',
      'updatedAt'
    ])
    return res.status(STATUS.HTTP_OK).json({ message: '_', data: dataUsers })
  } catch (error) {
    // TODO: Error personalizado
    return res
      .status(STATUS.HTTP_BAD_REQUEST)
      .json({ message: 'Error on search all users', error })
  }
}

const loadImageProfile = async (req, res) => {
  const { id } = req.params
  const { path } = req.file
  try {
    const userExists = await userService.getUser(id)
    if (!userExists) {
      return res
        .status(STATUS.HTTP_NOT_FOUND)
        .json({ message: 'User not found on database' })
    }
    const options = optionsProfilePhotoUpload(id)
    const { secure_url } = await uploadService.uploadCloud(path, options)
    await userService.updateImage(id, secure_url)
    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'Image saved successfully', url: secure_url })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on upload image', error })
  } finally {
    uploadService.deleteResource(path)
  }
}

const getImageProfile = async (req, res) => {
  const { id } = req.params
  try {
    const userExists = await userService.getUser(id)
    if (!userExists) {
      return res
        .status(STATUS.HTTP_NOT_FOUND)
        .json({ message: 'User not found on database' })
    }
    const { image } = await userService.getImage(id)
    return res.status(STATUS.HTTP_OK).json({ message: '-', image })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on get image', error })
  }
}

const deleteImageProfile = async (req, res) => {
  const { id } = req.params
  try {
    const userExists = await userService.getUser(id)
    if (!userExists) {
      return res
        .status(STATUS.HTTP_NOT_FOUND)
        .json({ message: 'User not found on database' })
    }
    const image = await userService.deleteImage(id)
    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'Image deleted successfully', image })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on delete image', error })
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  loadImageProfile,
  getImageProfile,
  deleteImageProfile
}
