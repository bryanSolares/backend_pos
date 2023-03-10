/* eslint camelcase: ["error", {properties: "never"}]*/

const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database.connect')

const Tag = sequelize.define(
  'Tag',
  {
    cod_tag: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  },
  {
    tableName: 'tag',
    indexes: [{ unique: true, fields: ['cod_tag'] }],
    freezeTableName: true
  }
)

module.exports = Tag
