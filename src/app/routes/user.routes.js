const { Router } = require('express')
const router = Router()
const userController = require('../controllers/user.controller')
const { newUser } = require('../middlewares/user.middleware')
const { updateUser } = require('../middlewares/user.middleware')
const { deleteUser } = require('../middlewares/user.middleware')
const { getImage } = require('../middlewares/user.middleware')
const { deleteImage } = require('../middlewares/user.middleware')
const upload = require('../utils/files.utils')
const { imageValidate } = require('../middlewares/image.middleware')
const { validationHandle } = require('../utils/validate.utils')

//TODO: Middleware para validar que vengan los datos que se esperan

router.post('/', newUser, validationHandle, userController.createUser)
router.patch('/:id', updateUser, validationHandle, userController.updateUser)
router.get('/:id', userController.getUser)
router.get('/', userController.getAllUsers)
router.delete('/:id', deleteUser, validationHandle, userController.deleteUser)
router.post('/upload/:id', upload.single('profile'), imageValidate, validationHandle, userController.loadImageProfile)
router.get('/upload/:id', getImage, validationHandle, userController.getImageProfile)
router.delete('/upload/:id', deleteImage, validationHandle, userController.deleteImageProfile)

module.exports = router
