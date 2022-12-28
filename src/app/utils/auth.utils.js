const jwt = require('jsonwebtoken')
const { SECRET_KEY, JWT_ALGORITHM } = require('../../config/dotenv')

const generateToken = (id, payload) => {
  return jwt.sign({ sub: id, ...payload }, SECRET_KEY, { expiresIn: '1h', algorithm: JWT_ALGORITHM })
}

const dataTokenValid = (token) => {
  return jwt.verify(token, SECRET_KEY, { algorithms: JWT_ALGORITHM })
}

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
