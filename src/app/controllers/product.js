const service = require('../services/product')

const createProduct = async (req, res) => {
  const data = req.body
  try {
    if (data.cod_product) {
      const productFinded = await service.getProduct(data.cod_product)
      if (productFinded) {
        return res.status(400).json({ message: 'El producto que desea crear ya existe en la base de datos' })
      }
    }

    const { cod_product, name, description, status } = await service.createProduct(data)
    const product = {
      cod_product,
      name,
      description,
      status
    }
    res.status(201).json({ message: 'Producto creado con éxito', product })
  } catch (error) {
    res.status(500).json({ message: 'Error on Server', error })
  }
}

const updateProduct = async (req, res) => {
  const data = req.body
  const { id } = req.params
  try {
    const productFinded = await service.getProduct(id)
    if (!productFinded || productFinded.deleted === true) {
      return res.status(400).json({ message: 'El producto a modificar no existe en la base de datos' })
    }
    await service.updateProduct(data, id)
    res.status(200).json({ message: 'Product has updated successfuly' })
  } catch (error) {
    res.status(500).json({ message: 'Error on Server', error })
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const productFinded = await service.getProduct(id)
    if (!productFinded || productFinded.deleted === true) {
      return res.status(400).json({ message: 'El producto a eliminar no existe en la base de datos' })
    }
    await service.deleteProduct(id)

    res.status(200).json({ message: 'Product has deleted successfuly' })
  } catch (error) {
    res.status(500).json({ message: 'Error on Server', error })
  }
}

const getProduct = async (req, res) => {
  const { id } = req.params
  const { include_tags } = req.query

  try {
    const product = await service.getProduct(id, ['deleted', 'updatedAt', 'createdAt'], include_tags)
    res.status(200).json({ message: '-', product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error on Server', error })
  }
}

const getProductList = async (req, res) => {
  const { limit, page, include_tags } = req.query
  try {
    if (limit < 1 || page < 1) {
      return res.status(400).json({ message: 'The query limit or page is not valid' })
    }
    const products = await service.getProducts(page, limit, ['deleted', 'createdAt', 'updatedAt'], include_tags)
    res.status(200).json({ message: '-', data: products })
  } catch (error) {
    res.status(500).json({ message: 'Error on Server', error })
  }
}

const uploadImages = async (req, res) => {}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductList,
  uploadImages
}
