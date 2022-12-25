const userService = require('../services/user.service')
const { encryptPassword } = require('../utils/user.utils')

const createUser = async (req, res) => {
  const userData = req.body

  try {
    const userExists = await userService.getUser(userData.cod_user)
    if (userExists) return res.status(400).json({ message: 'User already, please try new cod_user' })
    const passwordEncrypted = await encryptPassword(userData.password)
    const userSaved = { ...userData, password: passwordEncrypted }
    const userCreated = await userService.createUser(userSaved)

    res.status(201).json({ message: 'User created successfully', user: userCreated })
  } catch (error) {
    //TODO: Error personalizado
    res.status(400).json({ message: 'Error on create user', error: error })
  }
}

const updateUser = async (req, res) => {
  const userData = req.body
  const id = req.params.id
  try {
    const userExists = await userService.getUser(id)
    if (!userExists) return res.status(404).json({ message: 'User not found on database' })
    if (userData.password) {
      let newPassword = await encryptPassword(userData.password)
      userData.password = newPassword
    }
    await userService.updateUser(id, userData)

    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    //TODO: Error personalizado
    res.status(400).json({ message: 'Error on update user', error: error })
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    const user = await userService.getUser(id)
    if (!user || Object.entries(user).length === 0 || user.deleted === true) {
      return res.status(404).json({ message: 'User not found on database' })
    }
    await userService.deleteUser(id)

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    //TODO: Error personalizado
    res.status(400).json({ message: 'Error on delete user', error: error })
  }
}

const getUser = async (req, res) => {
  const idUser = req.params.id

  try {
    const user = await userService.getUser(idUser)
    res.status(200).json({ message: '_', user })
  } catch (error) {
    //TODO: Error personalizado
    res.status(400).json({ message: 'Error on search user', error: error })
  }
}

const getAllUsers = async (req, res) => {
  const { limit, page } = req.query
  try {
    if ((limit && isNaN(limit)) || (page && isNaN(page))) {
      return res.status(404).json({ message: 'The query limit or page is not valid' })
    }

    const dataUsers = await userService.getAllUsers(page, limit)
    res.status(200).json({ message: '_', users: dataUsers })
  } catch (error) {
    //TODO: Error personalizado
    res.status(400).json({ message: 'Error on search all users', error: error })
  }
}

const uploadImage = (req, res) => {}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  uploadImage
}
