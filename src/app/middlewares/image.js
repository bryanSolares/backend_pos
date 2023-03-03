const { checkSchema } = require('express-validator')

const imageValidate = checkSchema({
  id: {
    in: 'params',
    exists: true,
    errorMessage: 'Please provide a valid id'
  },
  file: {
    custom: {
      options: (value, { req, location, path }) => {
        if (!req.file) {
          throw new Error('Invalid format to image, admits: jpg, jpeg, png, gif, bmp')
        }
        return req.file
      }
    }
  }
})

module.exports = { imageValidate }
