const router = require('express').Router()
const userController = require('../controllers/user')
const { newUser } = require('../middlewares/user')
const { updateUser } = require('../middlewares/user')
const { deleteUser } = require('../middlewares/user')
const { getImage } = require('../middlewares/user')
const { deleteImage } = require('../middlewares/user')
const upload = require('../utils/files')
const { imageValidate } = require('../middlewares/image')
const { validationHandle } = require('../utils/validate')
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/', requireAuth, newUser, validationHandle, userController.createUser)

router.patch('/:id', requireAuth, updateUser, validationHandle, userController.updateUser)

router.get('/:id', requireAuth, userController.getUser)

router.get('/', requireAuth, userController.getAllUsers)

router.delete('/:id', requireAuth, deleteUser, validationHandle, userController.deleteUser)

router.post(
  '/upload/:id',
  requireAuth,
  upload.single('profile'),
  imageValidate,
  validationHandle,
  userController.loadImageProfile
)

router.get('/upload/:id', requireAuth, getImage, validationHandle, userController.getImageProfile)

router.delete('/upload/:id', requireAuth, deleteImage, validationHandle, userController.deleteImageProfile)

module.exports = router
