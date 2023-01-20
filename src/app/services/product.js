const productModel = require('../models/product')
const utils = require('../utils/utils')

const createProduct = async (data) => {
  let dataProduct = { ...data }
  if (!dataProduct.cod_product) dataProduct.cod_product = utils.createUUID()
  return await productModel.create(dataProduct, { raw: true })
}

const updateProduct = async (data, id) => {
  return await productModel.update(data, { where: { cod_product: id } })
}

const deleteProduct = async (id) => {
  return await productModel.update({ deleted: true }, { where: { cod_product: id } })
}

const destroyProduct = async (id) => {
  return await productModel.destroy({ where: { cod_produt: id } })
}

const getProduct = async (id, excludeFields) => {
  return productModel.findOne({
    where: { cod_product: id, deleted: false },
    attributes: { exclude: excludeFields },
    raw: true
  })
}

const getProducts = async (page = 1, limit = 10, excludeFields) => {
  const offset = parseInt((page - 1) * limit)
  const { rows, count } = await productModel.findAndCountAll({
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
