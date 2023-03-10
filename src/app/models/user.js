/* eslint camelcase: ["error", {properties: "never"}]*/

const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database.connect')

const User = sequelize.define(
  'User',
  {
    cod_user: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    phone: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        'https://res.cloudinary.com/dlsouq7fi/image/upload/v1672077611/profiles/not_image_hj9bk3.jpg'
    },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  {
    tableName: 'users',
    indexes: [{ unique: true, fields: ['cod_user'] }],
    freezeTableName: true
  }
)

module.exports = User
