const { Router } = require('express')
const router = Router()
const UserController = require('../controllers/user.controller')
const { newUser } = require('../middlewares/user.middleware')
const { validationHandle } = require('../utils/validate.utils')

//TODO: Middleware para validar que vengan los datos que se esperan

router.post('/', newUser, validationHandle, UserController.createUser)
router.patch('/:id', UserController.updateUser)
router.get('/:id', UserController.getUser)
router.get('/', UserController.getAllUsers)
router.delete('/:id', UserController.deleteUser)
router.put('/:id', UserController.uploadImage)

module.exports = router
