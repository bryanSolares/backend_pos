const userModel = require('../models/user.model')

const excludeFields = ['deleted', 'createdAt', 'updatedAt']

const createUser = async (user) => {
  const { status, image, cod_user, name, lastname, email, phone } = await userModel.create(user, { raw: true })
  return { status, image, cod_user, name, lastname, email, phone }
}

const getUser = async (id) => {
  return userModel.findOne({
    where: { cod_user: id, deleted: false },
    attributes: { exclude: excludeFields },
    raw: true
  })
}

const getAllUsers = async (page = 1, limit = 10) => {
  const offset = parseInt((page - 1) * limit)
  const { rows, count } = await userModel.findAndCountAll({
    where: { deleted: false },
    raw: true,
    limit,
    offset,
    attributes: { exclude: excludeFields },
    order: [['cod_user', 'ASC']]
  })
  const totalPages = Math.ceil(count / limit)

  return { pages: totalPages, users: rows }
}

const updateUser = async (id, user) => {
  return userModel.update(user, { where: { cod_user: id } })
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

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateImage,
  getImage,
  deleteImage,
  destroyUser
}
