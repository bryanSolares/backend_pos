const request = require('supertest')
const app = require('../../app')
const { User } = require('../../app/models')
const { Tag } = require('../../app/models')
const { Product } = require('../../app/models')
const { ProductTags } = require('../../app/models')
const userService = require('../../app/services/user')
const tagService = require('../../app/services/tag')
const productService = require('../../app/services/product')

let token
const fakeUserInitial = {
  cod_user: 'administrador',
  password: 'administrador',
  name: 'fake',
  lastname: 'fake',
  email: 'solares.josue@outlook.com',
  phone: '+502 4557-3001'
}

beforeAll(async () => {
  console.log('init beforeAll')
  await app.listen()
  await User.destroy({ where: {} /* , truncate: true */ })
  await ProductTags.destroy({ where: {} /* , truncate: true */ })
  await Tag.destroy({ where: {} /* , truncate: true */ })
  await Product.destroy({ where: {} /* , truncate: true */ })
  await userService.createUser(fakeUserInitial)
})

afterAll(async () => {
  await app.stop()
})

module.exports = {
  app: app.app,
  server: app.server,
  data: {
    token,
    fakeUserInitial
  },
  userService,
  tagService,
  productService
}
