const uuid = require('uuid').v4

const createUUID = () => {
  return uuid()
}

module.exports = {
  createUUID
}
