const { validationResult } = require('express-validator')

const validationHandle = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'validation error', errors: error.errors })
  }
}

module.exports = { validationHandle }
