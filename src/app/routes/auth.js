const { Router } = require('express')
const router = Router()
const authController = require('../controllers/auth')
const { validateLogin } = require('../middlewares/validations/auth')
const { validationHandle } = require('../utils/validate')

router.post('/login', validateLogin, validationHandle, authController.login)
router.post('/token', authController.renewToken)

module.exports = router
