const { checkSchema } = require('express-validator')

const validateLogin = checkSchema({
  username: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    exists: true,
    errorMessage: 'Please enter a username'
  },
  password: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    exists: true,
    errorMessage: 'Please enter a password'
  }
})

module.exports = { validateLogin }
