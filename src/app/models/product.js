/* eslint camelcase: ["error", {properties: "never"}]*/

const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database.connect')

const Product = sequelize.define(
  'Product',
  {
    cod_product: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'product',
    indexes: [{ unique: true, fields: ['cod_product'] }],
    freezeTableName: true
  }
)

module.exports = Product
