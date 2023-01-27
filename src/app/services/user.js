const bcrypt = require('bcrypt')
const userModel = require('../models/user')

/**
 * Creación de usuario, se recibe el grupo de información previamente validada
 * y se añade a la base de datos, previamente encriptando la contraseña
 *
 * @param {Object} data Data user of is create
 * @returns {Object} Data of user created
 */
const createUser = async (data) => {
  const passwordEncrypted = await encryptPassword(data.password)
  const userOfCreate = { ...data, password: passwordEncrypted }
  return await userModel.create(userOfCreate, { raw: true })
}

const getUser = async (id, excludeToFields) => {
  return userModel.findOne({
    where: { cod_user: id, deleted: false },
    attributes: { exclude: excludeToFields },
    raw: true
  })
}

const getAllUsers = async (page = 1, limit = 10, excludeToFields) => {
  const offset = parseInt((page - 1) * limit)
  const { rows, count } = await userModel.findAndCountAll({
    where: { deleted: false },
    raw: true,
    limit,
    offset,
    attributes: { exclude: excludeToFields },
    order: [['cod_user', 'ASC']]
  })
  const totalPages = Math.ceil(count / limit)

  return { pages: totalPages, users: rows }
}

const updateUser = async (id, data) => {
  let userOfUpdate = { ...data }

  if (userOfUpdate.password) {
    userOfUpdate.password = await encryptPassword(userOfUpdate.password)
  }

  return userModel.update(userOfUpdate, { where: { cod_user: id } })
}
const deleteUser = async (id) => {
  return userModel.update({ deleted: true }, { where: { cod_user: id } })
}
const updateImage = async (id, url) => {
  return userModel.update({ image: url }, { where: { cod_user: id } })
}

const getImage = async (id) => {
  return userModel.findByPk(id, { attributes: ['image'] })
}

const deleteImage = async (id) => {
  const imageDefault = 'https://res.cloudinary.com/dlsouq7fi/image/upload/v1672077611/profiles/not_image_hj9bk3.jpg'
  userModel.update({ image: imageDefault }, { where: { cod_user: id } })
  return imageDefault
}

const destroyUser = async (id) => {
  return userModel.destroy({ where: { cod_user: id } })
}

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) reject(error)
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) reject(error)
        resolve(hash)
      })
    })
  })
}

const comparePassword = (password, encryptedPassword) => {
  return new Promise(async (resolve) => {
    const result = await bcrypt.compare(password, encryptedPassword)
    resolve(result)
  })
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateImage,
  getImage,
  deleteImage,
  destroyUser,
  comparePassword
}
