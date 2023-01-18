const router = require('express').Router()
const controller = require('../controllers/product')

router.post('/', controller.createProduct)
router.patch('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)
router.get('/:id', controller.getProduct)
router.get('/', controller.getProductList)
router.post('/:id', controller.uploadImages)

module.exports = router
