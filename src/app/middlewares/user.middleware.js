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
    isString: {
      errorMessage: 'Password must be a string',
      options: true
    },
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
    errorMessage: 'Please enter a phone number',
    isLength: {
      errorMessage: 'Phone should be at least minimum 14 characters and maximum 14 characters',
      options: { min: 14, max: 14 }
    },
    matches: {
      options: /^\+502\s\d{4}\-\d{4}$/,
      errorMessage: 'Phone should be format valid, pather +50X XXXX-XXXX'
    }
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
    isString: {
      errorMessage: 'Password must be a string',
      options: true
    },
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
    errorMessage: 'Please enter a phone number',
    isLength: {
      errorMessage: 'Phone should be at least minimum 14 characters and maximum 14 characters',
      options: { min: 14, max: 14 }
    },
    matches: {
      options: /^\+502\s\d{4}\-\d{4}$/,
      errorMessage: 'Phone should be format valid, pather +50X XXXX-XXXX'
    }
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

const getImage = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'Please enter cod_user of image'
  }
})

const deleteImage = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'Please enter cod_user of image'
  }
})

module.exports = {
  newUser,
  updateUser,
  deleteUser,
  getImage,
  deleteImage
}
