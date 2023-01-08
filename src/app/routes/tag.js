const router = require('express').Router()
const controller = require('../controllers/tag')
const { validationOfCreateTag } = require('../middlewares/validations/tag')
const { validationOfUpdate } = require('../middlewares/validations/tag')
const { validationOfGetAllTags } = require('../middlewares/validations/tag')
const { validationHandle } = require('../utils/validate.utils')

router.post('/', validationOfCreateTag, validationHandle, controller.createTag)
router.patch('/:id', validationOfUpdate, validationHandle, controller.updateTag)
router.delete('/:id', controller.deleteTag)
router.get('/:id', controller.getTag)
router.get('/', validationOfGetAllTags, validationHandle, controller.getTags)

module.exports = router
