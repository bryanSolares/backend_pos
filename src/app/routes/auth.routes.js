const { Router } = require('express')
const router = Router()
const authController = require('../controllers/auth.controller')
const { validateLogin } = require('../middlewares/auth.validates')
const { validationHandle } = require('../utils/validate.utils')

router.post('/login', validateLogin, validationHandle, authController.login)
router.post('/token', authController.renewToken)

module.exports = router
