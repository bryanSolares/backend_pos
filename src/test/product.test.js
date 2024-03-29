const request = require('supertest')
const { app, productService } = require('./helpers/helper')

let token
const url_base = '/api/product'

beforeAll(async () => {
  const { body } = await request(app)
    .post('/api/auth/login')
    .send({ username: 'administrador', password: 'administrador' })
  token = body.token
})

describe('PRODUCT ADMINISTRATION', () => {
  test('Deberá mostrar un 201 por creación de un producto', async () => {
    const response = await request(app)
      .post(url_base)
      .set({ Authorization: token })
      .send({
        name: 'producto'
      })
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const { product } = response.body

    expect(product).toMatchObject({
      cod_product: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
      name: 'producto',
      description: null,
      status: /true|false/
    })
  })

  test('Deberá mostrar un 400 por intentar crear un producto con código ya existente', async () => {
    await productService.createProduct({ cod_product: 123, name: 'product' })

    const response = await request(app)
      .post(url_base)
      .send({
        cod_product: '123',
        name: 'product'
      })
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const { message } = response.body
    expect(message).toEqual('El producto que desea crear ya existe en la base de datos')
  })

  //TODO: solucionar por HandlerError personalizado
  test('Deberá mostrar un 400 por tratar de crear un producto sin nombre, body único obligatorio', async () => {
    const response = await request(app)
      .post(url_base)
      .send({})
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(500)

    const messageErrorName = response.body.errors.find((err) => err.param === 'name')
    expect(messageErrorName).toMatchObject({
      msg: 'Should provide value of this param',
      param: 'name',
      location: 'body'
    })
  })

  test('Deberá mostrar un 200 por modificar correctamente un producto', async () => {
    const response = await request(app)
      .patch(`${url_base}/123`)
      .send({ name: 'Nombre modificado', description: 'Descripción Modificada', status: false })
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { message } = response.body
    expect(message).toEqual('Product has updated successfuly')
  })

  test('Deberá mostrar un 400 al modificar un producto no existente', async () => {
    const response = await request(app)
      .patch(`${url_base}/abc123`)
      .send({ name: 'Nombre modificado', description: 'Descripción Modificada', status: false })
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const { message } = response.body
    expect(message).toEqual('El producto a modificar no existe en la base de datos')
  })

  test('Deberá mostrar un 200 al eliminar un producto correctamente', async () => {
    const response = await request(app)
      .delete(`${url_base}/123`)
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { message } = response.body
    expect(message).toEqual('Product has deleted successfuly')
  })

  test('Deberá mostrar un 400 al eliminar un producto no existente', async () => {
    const response = await request(app)
      .delete(`${url_base}/123abc`)
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const { message } = response.body
    expect(message).toEqual('El producto a eliminar no existe en la base de datos')
  })

  test('Deberá mostrar un 200 y un JSON con el producto solicitado', async () => {
    await productService.destroyProduct('123')
    await productService.createProduct({ cod_product: '123', name: 'product' })

    const response = await request(app)
      .get(`${url_base}/123`)
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { product } = response.body

    expect(product).toMatchObject({ cod_product: '123', name: 'product', description: null, status: true })
  })

  test('Deberá mostrar un 200 y un null por buscar un producto no existente', async () => {
    const response = await request(app)
      .get(`${url_base}/abc123`)
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { product } = response.body

    expect(product).toBeNull()
  })

  test('Deberá mostrar un 200 y devolver al menos un valor', async () => {
    const response = await request(app)
      .get(`${url_base}`)
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { data } = response.body
    expect(data.products.length).not.toBe(0)
  })

  test('Deberá mostrar un 200 y devolver al menos un valor al indicar la cantidad máxima de items a devolver', async () => {
    const response = await request(app)
      .get(`${url_base}`)
      .query({ limit: 1 })
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { data } = response.body
    expect(data.products.length).toBe(1)
  })

  test('Deberá mostrar un 200 y no devolver nada por indicar un número de página no existente pero válida', async () => {
    const response = await request(app)
      .get(`${url_base}`)
      .query({ limit: 1, page: 100000 })
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const { data } = response.body
    expect(data.products.length).toBe(0)
  })

  //TODO: solucionar por HandlerError personalizado
  test('Deberá mostrar un 400 por intentar enviar un limit y page inválidos', async () => {
    const responseOne = await request(app)
      .get(`${url_base}`)
      .query({ limit: 'abc', page: 'abc' })
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(500)

    const responseTwo = await request(app)
      .get(`${url_base}`)
      .query({ limit: -1, page: -1 })
      .set({ Authorization: token })
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
