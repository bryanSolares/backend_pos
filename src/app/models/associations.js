const Product = require('./product')
const Tag = require('./tag')
const ProductTags = require('./productTags')

Product.belongsToMany(Tag, {
  through: ProductTags,
  as: 'tags',
  foreignKey: 'cod_product'
})
Tag.belongsToMany(Product, {
  through: ProductTags,
  as: 'products',
  foreignKey: 'cod_tag'
})
