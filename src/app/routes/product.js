const router = require('express').Router()
const controller = require('../controllers/product')
const { validationOfCreateTag } = require('../middlewares/validations/product')
const { validationOfUpdate } = require('../middlewares/validations/product')
const { validationOfGetAllTags } = require('../middlewares/validations/product')
const { validationHandle } = require('../utils/validate.utils')
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/', requireAuth, validationOfCreateTag, validationHandle, controller.createProduct)
router.patch('/:id', requireAuth, validationOfUpdate, validationHandle, controller.updateProduct)
router.delete('/:id', requireAuth, controller.deleteProduct)
router.get('/:id', requireAuth, controller.getProduct)
router.get('/', requireAuth, validationOfGetAllTags, validationHandle, controller.getProductList)
router.post('/:id', controller.uploadImages)

module.exports = router
