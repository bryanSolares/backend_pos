const request = require('supertest')
const { app } = require('./helpers/helper')
const { createTag, destroyTag } = require('../app/services/tag')

describe('TAG ADMINISTRATION', () => {
  test('Deberá mostrar un 201 por creación de una etiqueta', async () => {
    const response = await request(app)
      .post('/api/tag')
      .send({
        name: 'tag'
      })
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const { tag } = response.body

    expect(tag).toMatchObject({
      cod_tag: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
      name: 'tag',
      description: null,
      status: /true|false/
    })
  })

  test('Deberá mostrar un 400 por intentar una etiqueta con código ya existente', async () => {
    await destroyTag('123')
    await createTag({ cod_tag: 123, name: 'tag' })

    const response = await request(app)
      .post('/api/tag')
      .send({
        cod_tag: '123',
        name: 'tag'
      })
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const { message } = response.body
    expect(message).toEqual('La categoria que desea crear ya existe en la base de datos, por favor indique otro código')
  })

  //TODO: solucionar por HandlerError personalizado
  test('Deberá mostrar un 400 por tratar de crear una etiqueta sin nombre, body único obligatorio', async () => {
    const response = await request(app)
      .post('/api/tag')
      .send({})
      .expect('Content-Type', /application\/json/)
      .expect(500)

    const messageErrorName = response.body.errors.find((err) => err.param === 'name')
    expect(messageErrorName).toMatchObject({
      msg: 'Should provide value of this param',
      param: 'name',
      location: 'body'
    })
  })

  test('Deberá mostrar un 200 por modificar correctamente una etiqueta', async () => {
    await destroyTag('1234')
    await createTag({ cod_tag: '1234', name: 'tag' })

    const response = await request(app)
      .patch('/api/tag/1234')
      .send({ name: 'Nombre modificado', description: 'Descripción Modificada', status: false })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { message } = response.body
    expect(message).toEqual('Tag updated on succesfully')
  })

  test('Deberá mostrar un 400 al modificar una etiqueta no existente', async () => {
    const response = await request(app)
      .patch('/api/tag/abc123')
      .send({ name: 'Nombre modificado', description: 'Descripción Modificada', status: false })
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const { message } = response.body
    expect(message).toEqual('La categoría a modificar no existe en base de datos')
  })

  test('Deberá mostrar un 200 al eliminar una etiqueta correctamente', async () => {
    await destroyTag('1234')
    await createTag({ cod_tag: '1234', name: 'tag' })

    const response = await request(app)
      .delete('/api/tag/1234')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { message } = response.body
    expect(message).toEqual('Tag deleted on succesfully')
  })

  test('Deberá mostrar un 400 al eliminar una etiqueta no existente', async () => {
    const response = await request(app)
      .delete('/api/tag/123abc')
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const { message } = response.body
    expect(message).toEqual('La categoría a eliminar no existe en base de datos')
  })

  test('Deberá mostrar un 200 y un JSON con la etiqueta solicitada', async () => {
    await destroyTag('1234')
    await createTag({ cod_tag: '1234', name: 'tag' })

    const response = await request(app)
      .get('/api/tag/1234')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { tag } = response.body

    expect(tag).toMatchObject({ cod_tag: '1234', name: 'tag', description: null, status: true })
  })

  test('Deberá mostrar un 200 y un null por buscar una etiquta no existente', async () => {
    const response = await request(app)
      .get('/api/tag/1234abc')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { tag } = response.body

    expect(tag).toBeNull()
  })

  test('Deberá mostrar un 200 y devolver al menos un valor', async () => {
    await destroyTag('1234')
    await createTag({ cod_tag: '1234', name: 'tag' })
    const response = await request(app)
      .get('/api/tag')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { data } = response.body
    expect(data.tags.length).not.toBe(0)
  })

  test('Deberá mostrar un 200 y devolver al menos un valor al indicar la cantidad máxima de itema a devolver', async () => {
    await destroyTag('1234')
    await createTag({ cod_tag: '1234', name: 'tag' })
    const response = await request(app)
      .get('/api/tag')
      .query({ limit: 1 })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { data } = response.body
    expect(data.tags.length).toBe(1)
  })

  test('Deberá mostrar un 200 y no devolver nada por indicar un número de página no existente pero válida', async () => {
    await destroyTag('1234')
    await createTag({ cod_tag: '1234', name: 'tag' })
    const response = await request(app)
      .get('/api/tag')
      .query({ limit: 1, page: 100000 })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { data } = response.body
    expect(data.tags.length).toBe(0)
  })

  //TODO: solucionar por HandlerError personalizado
  test('Deberá mostrar un 400 por intentar enviar un limit y page inválidos', async () => {
    await destroyTag('1234')
    await createTag({ cod_tag: '1234', name: 'tag' })

    const responseOne = await request(app)
      .get('/api/tag')
      .query({ limit: 'abc', page: 'abc' })
      .expect('Content-Type', /application\/json/)
      .expect(500)

    const responseTwo = await request(app)
      .get('/api/tag')
      .query({ limit: -1, page: -1 })
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const messageErrorLimit = responseOne.body.errors.find((err) => err.param === 'limit')
    const messageErrorPage = responseOne.body.errors.find((err) => err.param === 'page')
    const { message } = responseTwo.body

    expect(message).toEqual('The query limit or page is not valid')
    expect(messageErrorLimit).toMatchObject({
      msg: 'Value provided is not a number',
      param: 'limit',
      location: 'query'
    })
    expect(messageErrorPage).toMatchObject({
      msg: 'Value provided is not a number',
      param: 'page',
      location: 'query'
    })
  })
})
