const path = require('path')
const request = require('supertest')
const { app, data } = require('./helpers/helper')
const { destroyUser } = require('../app/services/user.service')

const dataNewUser = {
  cod_user: 'bryan_solares',
  password: '12345',
  name: 'Bryan Josué',
  lastname: 'Solares',
  email: 'solares.josue@outlook.com',
  phone: '+502 4557-3001'
}

const dataBadUser = {
  password: '123',
  name: 'Bryan Josué',
  lastname: 'Solares',
  email: 'solares.josue@outlook.com',
  phone: '123456'
}

const dataUserForUpdate = {
  cod_user: 'bryan_solares',
  data: {
    password: '12345',
    name: 'Bryan Josué',
    lastname: 'Solares',
    email: 'solares.josue@outlook.com',
    phone: '+502 4557-3001'
  }
}

describe('/API/USER -> CRUD de Usuarios', () => {
  //TODO: Deberá devolver un json
  test('Se espera un 401 por intentar hacer una acción sin envíar token', async () => {
    await request(app).post('/api/user').send(dataNewUser).expect(401)
  })

  test('Se espera que la creación de un usuario sea exitosa con los parámetros correctos', async () => {
    await destroyUser('bryan_solares')
    await request(app)
      .post('/api/user')
      .send(dataNewUser)
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(201)
  })

  test('Se espera recibir un error 400 al intentar crear un usuario con código de usuario ya existente en BD, acompañado de un mensaje "User already, please try new cod_user"', async () => {
    const response = await request(app)
      .post('/api/user')
      .send(dataNewUser)
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response.body.message).toBe('User already, please try new cod_user')
  })

  //TODO: solucionar por HandlerError personalizado
  test('Se espera recibir un error 400 por falta de parámetros obligatorio en la petición de creación y no cumplir con longitud de contraseña', async () => {
    const response = await request(app)
      .post('/api/user')
      .send(dataBadUser)
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(500)
    const errorOfPassword = response.body.errors.find((err) => err.param === 'password')
    const errorOfUserCode = response.body.errors.find((err) => err.param === 'cod_user')
    expect(errorOfPassword.msg).toEqual('Password should be at least 5 chars long')
    expect(errorOfUserCode.msg).toEqual('Please enter a user name')
  })

  test('Se espera recibir un 404 por intentar modificar un usuario no existente en la base de datos', async () => {
    const response = await request(app)
      .patch(`/api/user/anywhere`)
      .send(dataUserForUpdate.data)
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(404)
    expect(response.body.message).toEqual('User not found on database')
  })

  //TODO: solucionar por HandlerError personalizado
  test('Se espera recibir un 400 por intentar modificar un usuario con un grupo de datos no completo', async () => {
    const response = await request(app)
      .patch(`/api/user/${dataUserForUpdate.cod_user}`)
      .send(dataBadUser)
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(500)
    const errorOfPassword = response.body.errors.find((err) => err.param === 'password')
    expect(errorOfPassword.msg).toEqual('Password should be at least 5 chars long')
  })

  test('Se espera recibir un 200 al intentar modificar a un usuario con datos correctos', async () => {
    await request(app)
      .patch(`/api/user/${dataUserForUpdate.cod_user}`)
      .send(dataUserForUpdate.data)
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(200)
  })
  test('Se espera un 404 por tratar darle de baja a un usuario que no existe en base de datos', async () => {
    const response = await request(app)
      .delete('/api/user/anywhere')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(404)
    expect(response.body.message).toEqual('User not found on database')
  })

  test('Se espera recibir un 200 por darle de baja a un usuario proporcionando un código de usuario correcto', async () => {
    const response = await request(app)
      .delete('/api/user/bryan_solares')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.message).toEqual('User deleted successfully')
  })

  test('Se espera recibir un 404 por darle de baja a un usuario que no existe', async () => {
    const response = await request(app)
      .delete('/api/user/bryan_solares_')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(404)
    expect(response.body.message).toEqual('User not found on database')
  })

  test('Se espera que la petión se existosa y que almenos se devuelva un valor', async () => {
    const response = await request(app)
      .get('/api/user')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.data.users).toHaveLength(1)
  })

  test('Se espera un 200 y que devuelva los datos del usuario solicitado', async () => {
    await destroyUser('bryan_solares')
    await request(app).post('/api/user').send(dataNewUser).set('Authorization', data.token)

    const response = await request(app)
      .get('/api/user/bryan_solares')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    const { user } = response.body
    expect(user.cod_user).toBe('bryan_solares')
  })
})

describe('/API/USER/UPLOAD -> Imagen para perfil de usuario', () => {
  //TODO: solucionar por HandlerError personalizado
  test('Se espera un 400 por no enviar un archivo adjunto', async () => {
    await destroyUser('bryan_solares')
    await request(app).post('/api/user').send(dataNewUser).set('Authorization', data.token)
    const response = await request(app)
      .post('/api/user/upload/bryan_solares')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(500)
    const messageError = response.body.errors.find((err) => err.param === 'file')
    expect(messageError.msg).toEqual('Invalid format to image, admits: jpg, jpeg, png, gif, bmp')
  })

  //TODO: solucionar por HandlerError personalizado
  test('Se espera un 400 por enviar un adjunto que no es imagen', async () => {
    const response = await request(app)
      .post('/api/user/upload/bryan_solares')
      .attach('profile', path.join(__dirname, '/resource/test.mp3'))
      .set('Authorization', data.token)
      .timeout(5000)
      .expect('Content-Type', /application\/json/)
      .expect(500)
    const messageError = response.body.errors.find((err) => err.param === 'file')
    expect(messageError.msg).toEqual('Invalid format to image, admits: jpg, jpeg, png, gif, bmp')
  })

  test('Se espera un 200 por carga de imagen exitosa', async () => {
    const response = await request(app)
      .post('/api/user/upload/bryan_solares')
      .attach('profile', path.join(__dirname, '/resource/test.png'))
      .set('Authorization', data.token)
      .timeout(5000)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    const { message, url } = response.body
    expect(message).toEqual('Image saved successfully')
    expect(url).toContain('profiles/profile_bryan_solares')
  })

  test('Se espera un 404 por tratar de cargar una imagen a un usuario que no existe', async () => {
    const response = await request(app)
      .post('/api/user/upload/anywhere')
      .attach('profile', path.join(__dirname, '/resource/test.png'))
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(404)
    expect(response.body.message).toEqual('User not found on database')
  })

  test('Se espera la dirección URL de la imagen relacionada al perfil', async () => {
    const response = await request(app)
      .get('/api/user/upload/bryan_solares')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.image).toContain('profiles/profile_bryan_solares')
  })

  test('Se espera un 400 por buscar la imagen de un usuario no existente', async () => {
    const response = await request(app)
      .get('/api/user/upload/anywhere')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(404)
    expect(response.body.message).toEqual('User not found on database')
  })

  test('Se espera recibir un 404 por intentar eliminar imagen de un usuario no existente', async () => {
    const response = await request(app)
      .delete('/api/user/upload/anywhere')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(404)
    const { message } = response.body
    expect(message).toEqual('User not found on database')
  })

  test('Se espera recibir link de image "Sin Imagen" por eliminar imagen de perfil', async () => {
    const response = await request(app)
      .delete('/api/user/upload/bryan_solares')
      .set('Authorization', data.token)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    const { message, image } = response.body
    expect(message).toEqual('Image deleted successfully')
    expect(image).toEqual('https://res.cloudinary.com/dlsouq7fi/image/upload/v1672077611/profiles/not_image_hj9bk3.jpg')
  })
})
