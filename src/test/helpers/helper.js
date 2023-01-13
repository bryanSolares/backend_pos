const request = require('supertest')
const app = require('../../app')
const userModel = require('../../app/models/user.model')
const tagModel = require('../../app/models/tag')
const userService = require('../../app/services/user')
const tagService = require('../../app/services/tag')

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
  await userModel.destroy({ where: {}, truncate: true })
  await tagModel.destroy({ where: {}, truncate: true })
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
  tagService
}
