const Product = require('./product')
const Tag = require('./tag')
const ProductTags = require('./productTags')
const User = require('./user')
require('./associations')

module.exports = {
  Product,
  Tag,
  ProductTags,
  User
}
