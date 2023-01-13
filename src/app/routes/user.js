const router = require('express').Router()
const userController = require('../controllers/user')
const { newUser } = require('../middlewares/user.middleware')
const { updateUser } = require('../middlewares/user.middleware')
const { deleteUser } = require('../middlewares/user.middleware')
const { getImage } = require('../middlewares/user.middleware')
const { deleteImage } = require('../middlewares/user.middleware')
const upload = require('../utils/files.utils')
const { imageValidate } = require('../middlewares/image.middleware')
const { validationHandle } = require('../utils/validate.utils')
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
