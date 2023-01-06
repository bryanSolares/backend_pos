const router = require('express').Router()
const controller = require('../controllers/tag')

router.post('/', controller.createTag)
router.patch('/:id', controller.updateTag)
router.delete('/:id', controller.deleteTag)
router.get('/:id', controller.getTag)
router.get('/', controller.getTags)

module.exports = router
