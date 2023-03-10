/* eslint camelcase: ["error", {properties: "never"}]*/

const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database.connect')
const Product = require('./product')
const Tag = require('./tag')

const ProductTags = sequelize.define(
  'ProductTags',
  {
    cod_product: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Product,
        key: 'cod_product'
      }
    },
    cod_tag: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Tag,
        key: 'cod_tag'
      }
    }
  },
  {
    tableName: 'product_tags',
    indexes: [{ unique: true, fields: ['cod_product', 'cod_tag'] }],
    freezeTableName: true
  }
)

module.exports = ProductTags
