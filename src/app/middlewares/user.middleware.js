const { check, checkSchema } = require('express-validator')

const newUser = checkSchema({
  cod_user: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    errorMessage: 'Please enter a user name'
  },
  password: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    isLength: { options: { min: 5 }, errorMessage: 'Password should be at least 5 chars long' },
    errorMessage: 'Please enter a password'
  },
  name: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    errorMessage: 'Please enter a name'
  },
  lastname: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    errorMessage: 'Please enter a lastname'
  },
  email: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    isEmail: true,
    errorMessage: 'Please enter valid email'
  },
  phone: {
    in: ['body'],
    optional: true,
    notEmpty: true,
    errorMessage: 'Please enter a phone number'
  },
  image: {
    in: ['body'],
    not: true,
    exists: {
      errorMessage: 'Please not enter image in this request'
    }
  }
})

const updateUser = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'Please enter cod user for updated'
  },
  cod_user: {
    in: ['body'],
    not: true,
    exists: {
      errorMessage: "Can't you not change the cod user"
    }
  },
  password: {
    in: ['body'],
    optional: true,
    notEmpty: true,
    isLength: { options: { min: 5 }, errorMessage: 'Password should be at least 5 chars long' },
    errorMessage: 'Please enter a password'
  },
  name: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    errorMessage: 'Please enter a name'
  },
  lastname: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    errorMessage: 'Please enter a lastname'
  },
  email: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    isEmail: true,
    errorMessage: 'Please enter valid email'
  },
  phone: {
    in: ['body'],
    optional: true,
    notEmpty: true,
    errorMessage: 'Please enter a phone number'
  },
  image: {
    not: true,
    exists: {
      errorMessage: 'Please not enter image in this request'
    },
    in: ['body']
  }
})

const deleteUser = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'Please enter cod user for updated'
  }
})

const uploadImage = checkSchema({})

module.exports = {
  newUser,
  updateUser,
  deleteUser,
  uploadImage
}

//TODO: Para validar modificaciones o eliminaciones = https://express-validator.github.io/docs/schema-validation.html
