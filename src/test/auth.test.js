const request = require('supertest')
const { app, data, userService } = require('./helpers/helper')

const validUser = { username: data.fakeUserInitial.cod_user, password: data.fakeUserInitial.password }
const invalidUser = { username: 'generico_', password: 'generico_' }
const invalidPasswordUser = { username: data.fakeUserInitial.cod_user, password: 'generico_' }

describe('AUTH ADMINISTRATION', () => {
  test('Recibe un 200 y un token en la respuesta', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(validUser)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.token).toMatch(/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]*$/)
  })

  test('Recibe un 404 por envio de usuario no existente', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(invalidUser)
      .expect('Content-Type', /application\/json/)
      .expect(404)
    expect(response.body.message).toEqual('User not found on database')
  })

  test('Recibe un 401 por envio de contraseña incorrecta', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(invalidPasswordUser)
      .expect('Content-Type', /application\/json/)
      .expect(401)
    expect(response.body.message).toEqual('User or password incorrect, try again')
  })

  // TODO: solucionar por HandlerError personalizado
  test('Recibe un error 400 por falta de envío de username y password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .expect('Content-Type', /application\/json/)
      .expect(500)

    const messageErrorPassword = response.body.errors.find((err) => err.param === 'password')
    const messageErrorUsername = response.body.errors.find((err) => err.param === 'username')
    expect(messageErrorPassword).toMatchObject({ msg: 'Please enter a password', param: 'password', location: 'body' })
    expect(messageErrorUsername).toMatchObject({ msg: 'Please enter a username', param: 'username', location: 'body' })
  })
})

describe('TOKEN ADMINISTRATION', () => {
  test('Recibe un 200 por renovación de token con token antiguo válido', async () => {
    const {
      body: { token }
    } = await request(app).post('/api/auth/login').send(validUser)
    const response = await request(app)
      .post('/api/auth/token')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.token).toMatch(/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]*$/)
  })
  test('Recibe un 400 por no enviar token en petición', async () => {
    const response = await request(app)
      .post('/api/auth/token')
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response.body.message).toEqual('Token not exists in request')
  })
  // TODO: solucionar por HandlerError personalizado
  test('Recibe un 400 por enviar un token que no es válido', async () => {
    const response = await request(app)
      .post('/api/auth/token')
      .set('Authorization', 'Bearer abc')
      .expect('Content-Type', /application\/json/)
      .expect(500)
  })
  test('Recibe un 400 por enviar un token de usuario ya no existente en base de datos', async () => {
    await userService.createUser({
      cod_user: '-',
      password: '12345',
      name: '-',
      lastname: '-',
      email: 'a@a.com',
      phone: '+502 4557-3001'
    })

    const { body } = await request(app).post('/api/auth/login').send({ username: '-', password: '12345' })
    const { token } = body

    await userService.destroyUser('-')

    const response = await request(app)
      .post('/api/auth/token')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response.body.message).toEqual('User asigned of this token not found')
  })
})
