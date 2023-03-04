const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY } = require('../../config/dotenv')
const { JWT_PUBLIC_KEY } = require('../../config/dotenv')
const { JWT_ALGORITHM } = require('../../config/dotenv')

const generateToken = (id, payload) =>
  jwt.sign({ sub: id, ...payload }, JWT_PRIVATE_KEY, { expiresIn: '1h', algorithm: JWT_ALGORITHM })

const dataTokenValid = (token) =>
  jwt.verify(token, JWT_PUBLIC_KEY, { ignoreExpiration: true, algorithms: [JWT_ALGORITHM] })

const cleanToken = (authorization) => {
  let token
  if (authorization) {
    token = authorization.replace('Bearer ', '')
  }
  return token
}

module.exports = {
  generateToken,
  dataTokenValid,
  cleanToken
}
