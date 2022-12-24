const { Router } = require('express')
const router = Router()
const UserController = require('../controllers/user.controller')

//TODO: Middleware para validar que vengan los datos que se esperan

router.post('/', UserController.createUser)
router.patch('/:id', UserController.updateUser)
router.get('/:id', UserController.getUser)
router.get('/', UserController.getAllUsers)
router.delete('/:id', UserController.deleteUser)
router.put('/:id', UserController.uploadImage)

module.exports = router
