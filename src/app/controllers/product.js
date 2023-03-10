/* eslint camelcase: ["off", {properties: "never"}]*/

const service = require('../services/product')
const STATUS = require('../../config/statusCodes')

const createProduct = async (req, res) => {
  const data = req.body
  try {
    if (data.cod_product) {
      const productFinded = await service.getProduct(data.cod_product)
      if (productFinded) {
        return res.status(STATUS.HTTP_BAD_REQUEST).json({
          message: 'El producto que desea crear ya existe en la base de datos'
        })
      }
    }

    const { cod_product, name, description, status } =
      await service.createProduct(data)
    const product = {
      cod_product,
      name,
      description,
      status
    }
    return res
      .status(STATUS.HTTP_CREATED)
      .json({ message: 'Producto creado con éxito', product })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on Server', error })
  }
}

const updateProduct = async (req, res) => {
  const data = req.body
  const { id } = req.params
  try {
    const productFinded = await service.getProduct(id)
    console.log(productFinded)
    if (productFinded.length === 0 || productFinded[0].deleted === true) {
      return res.status(STATUS.HTTP_BAD_REQUEST).json({
        message: 'El producto a modificar no existe en la base de datos'
      })
    }

    await service.updateProduct(data, id)
    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'Product has updated successfuly' })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on Server', error })
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const productFinded = await service.getProduct(id)
    if (productFinded.length === 0 || productFinded[0].deleted === true) {
      return res.status(STATUS.HTTP_BAD_REQUEST).json({
        message: 'El producto a eliminar no existe en la base de datos'
      })
    }
    await service.deleteProduct(id)

    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'Product has deleted successfuly' })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on Server', error })
  }
}

const getProduct = async (req, res) => {
  const { id } = req.params
  const { includeTags } = req.query

  try {
    const product = await service.getProduct(
      id,
      ['deleted', 'updatedAt', 'createdAt'],
      includeTags
    )
    return res.status(STATUS.HTTP_OK).json({ message: '-', product })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on Server', error })
  }
}

const getProductList = async (req, res) => {
  const { limit, page, includeTags } = req.query
  try {
    if (limit < 1 || page < 1) {
      return res
        .status(STATUS.HTTP_BAD_REQUEST)
        .json({ message: 'The query limit or page is not valid' })
    }
    const products = await service.getProducts(
      page,
      limit,
      ['deleted', 'createdAt', 'updatedAt'],
      includeTags
    )
    return res.status(STATUS.HTTP_OK).json({ message: '-', data: products })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on Server', error })
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductList
}
