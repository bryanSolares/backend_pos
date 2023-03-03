const { Product } = require('../models')
const { ProductTags } = require('../models')
const { Tag } = require('../models')
const utils = require('../utils/utils')

// TODO: solucionar problema, creación de producto con inconveniente al momento de encontrar tag no existente
const createProduct = async (data) => {
  const dataProduct = { ...data }
  if (!dataProduct.cod_product) dataProduct.cod_product = utils.createUUID()

  const product = await Product.create(dataProduct, {})
  await product.setTags(dataProduct.tags)
  return product
}

// TODO: solucionar problema, edición de producto con inconveniente al momento de encontrar tag no existente
const updateProduct = async (data, id) => {
  await Product.update(data, { where: { cod_product: id } })
  await ProductTags.destroy({ where: { cod_product: id } })
  const productTags = data.tags.map((tag) => ({ cod_product: id, cod_tag: tag }))
  await ProductTags.bulkCreate(productTags, { validate: true })
  return {}
}

const deleteProduct = async (id) => await Product.update({ deleted: true }, { where: { cod_product: id } })

const destroyProduct = async (id) => await Product.destroy({ where: { cod_product: id } })

const getProduct = async (id, excludeFields, include_tags = 0) => {
  const product = await Product.findAll({
    where: { cod_product: id, deleted: false },
    include: include_tags ? includeOptionsModelTags() : [],
    attributes: { exclude: excludeFields },
    raw: true
  })

  const productReturn = include_tags ? transformData(product) : product
  return [productReturn]
}

const getProducts = async (page = 1, limit = 10, excludeFields, include_tags = 0) => {
  const offset = parseInt((page - 1) * limit)

  const { rows, count } = await Product.findAndCountAll({
    where: { deleted: false },
    include: include_tags ? includeOptionsModelTags() : [],
    raw: true,
    distinct: true,
    limit,
    offset,
    attributes: { exclude: excludeFields },
    order: [['cod_product', 'ASC']]
  })

  const totalPages = Math.ceil(count / limit)
  const productsResponse = include_tags ? transformData(rows, false) : rows

  return { pages: totalPages, products: productsResponse }
}

const transformData = (data, unique = true) => {
  let returnData
  if (unique) {
    returnData = {
      cod_product: data[0]?.cod_product,
      name: data[0]?.name,
      description: data[0]?.description,
      status: data[0]?.status,
      tags: []
    }

    returnData.tags = data.map((tag) => ({
      cod_tag: tag['tags.cod_tag'],
      name: tag['tags.name'],
      description: tag['tags.description'],
      status: tag['tags.status']
    }))
  } else {
    returnData = []
    let productTemp
    let index = -1
    data.forEach((product) => {
      if (productTemp == null || product.cod_product !== productTemp.cod_product) {
        returnData.push({
          cod_product: product.cod_product,
          name: product.name,
          description: product.description,
          status: product.status,
          tags: [
            {
              cod_tag: product['tags.cod_tag'],
              name: product['tags.name'],
              description: product['tags.description'],
              status: product['tags.status']
            }
          ]
        })
        productTemp = product
        index++
      } else {
        returnData[index].tags.push({
          cod_tag: product['tags.cod_tag'],
          name: product['tags.name'],
          description: product['tags.description'],
          status: product['tags.status']
        })
      }
    })
  }

  return returnData
}

const includeOptionsModelTags = () => [
  {
    model: Tag,
    as: 'tags',
    required: true,
    through: { attributes: [] }
  }
]

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  destroyProduct,
  getProduct,
  getProducts
}
