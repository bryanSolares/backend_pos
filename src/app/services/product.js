const { Product } = require('../models')
const utils = require('../utils/utils')

const createProduct = async (data) => {
  let dataProduct = { ...data }
  if (!dataProduct.cod_product) dataProduct.cod_product = utils.createUUID()
  return await Product.create(dataProduct, { raw: true })
}

const updateProduct = async (data, id) => {
  return await Product.update(data, { where: { cod_product: id } })
}

const deleteProduct = async (id) => {
  return await Product.update({ deleted: true }, { where: { cod_product: id } })
}

const destroyProduct = async (id) => {
  return await Product.destroy({ where: { cod_product: id } })
}

const getProduct = async (id, excludeFields) => {
  return Product.findOne({
    where: { cod_product: id, deleted: false },
    attributes: { exclude: excludeFields },
    raw: true
  })
}

const getProducts = async (page = 1, limit = 10, excludeFields) => {
  const offset = parseInt((page - 1) * limit)
  const { rows, count } = await Product.findAndCountAll({
    where: { deleted: false },
    raw: true,
    limit,
    offset,
    attributes: { exclude: excludeFields },
    order: [['cod_product', 'ASC']]
  })
  const totalPages = Math.ceil(count / limit)

  return { pages: totalPages, products: rows }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  destroyProduct,
  getProduct,
  getProducts
}
