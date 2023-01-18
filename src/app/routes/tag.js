const router = require('express').Router()
const controller = require('../controllers/tag')
const { validationOfCreateTag } = require('../middlewares/validations/tag')
const { validationOfUpdate } = require('../middlewares/validations/tag')
const { validationOfGetAllTags } = require('../middlewares/validations/tag')
const { validationHandle } = require('../utils/validate.utils')
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/', requireAuth, validationOfCreateTag, validationHandle, controller.createTag)
router.patch('/:id', requireAuth, validationOfUpdate, validationHandle, controller.updateTag)
router.delete('/:id', requireAuth, controller.deleteTag)
router.get('/:id', requireAuth, controller.getTag)
router.get('/', requireAuth, validationOfGetAllTags, validationHandle, controller.getTags)

module.exports = router
