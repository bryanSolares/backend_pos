const { check, checkSchema } = require('express-validator')
const { validationHandle } = require('../utils/validate.utils')

/**
 *
cod_user
password
name
lastname
email
phone
image
deleted
 */

const newUser = checkSchema({
  cod_user: {
    exists: true,
    notEmpty: true,
    in: ['body'],
    errorMessage: 'Please enter a user name'
  },
  password: {
    exists: true,
    notEmpty: true,
    isLength: { options: { min: 5 }, errorMessage: 'Password should be at least 5 chars long' },
    in: ['body'],
    errorMessage: 'Please enter a password'
  },
  name: {
    exists: true,
    notEmpty: true,
    in: ['body'],
    errorMessage: 'Please enter a name'
  },
  lastname: {
    exists: true,
    notEmpty: true,
    in: ['body'],
    errorMessage: 'Please enter a lastname'
  },
  email: {
    exists: true,
    notEmpty: true,
    isEmail: true,
    in: ['body'],
    errorMessage: 'Please enter a email'
  },
  phone: {
    optional: true,
    notEmpty: true,
    in: ['body'],
    errorMessage: 'Please enter a phone number'
  }
})

const updateUser = []

const deleteUser = []

module.exports = {
  newUser,
  updateUser,
  deleteUser
}

//TODO: Para validar modificaciones o eliminaciones = https://express-validator.github.io/docs/schema-validation.html
