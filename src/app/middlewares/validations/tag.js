const { checkSchema } = require('express-validator')

const validationOfCreateTag = checkSchema({
  cod_tag: {
    in: ['body'],
    optional: true,
    notEmpty: {
      errorMessage: 'Should provide value of this param'
    },
    isString: { errorMessage: 'Code should be a string' }
  },
  name: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    isString: { errorMessage: 'Name should be a string' },
    errorMessage: 'Should provide value of this param'
  },
  description: {
    in: ['body'],
    optional: true,
    notEmpty: {
      errorMessage: 'Should provide value of this param'
    },
    isString: { errorMessage: 'Description should be a string' }
  },
  status: {
    in: ['body'],
    optional: true,
    notEmpty: { errorMessage: 'Should provide value of this param' },
    isBoolean: { errorMessage: 'Status should be boolean' }
  }
})

const validationOfUpdate = checkSchema({
  id: {
    in: ['params'],
    exists: true,
    notEmpty: true,
    errorMessage: 'Should provide a cod tag of updated'
  },
  cod_tag: {
    not: true,
    exists: {
      errorMessage: 'You can´t update cod_tag'
    }
  },
  name: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    isString: { errorMessage: 'Name should be a string' },
    errorMessage: 'Should provide value of this param'
  },
  description: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    isString: { errorMessage: 'Name should be a string' },
    errorMessage: 'Should provide value of this param'
  },
  status: {
    in: ['body'],
    exists: true,
    notEmpty: true,
    isBoolean: { errorMessage: 'Status should be boolean' },
    errorMessage: 'Should provide value of this param'
  }
})

// TODO: Validar que el número sea mayor o igual a 1
const validationOfGetAllTags = checkSchema({
  limit: { optional: true, notEmpty: true, isNumeric: { errorMessage: 'Value provided is not a number' } },
  page: { optional: true, notEmpty: true, isNumeric: { errorMessage: 'Value provided is not a number' } }
})

module.exports = {
  validationOfCreateTag,
  validationOfUpdate,
  validationOfGetAllTags
}
