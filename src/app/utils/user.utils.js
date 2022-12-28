const bcrypt = require('bcrypt')

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) reject(error)
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) reject(error)
        resolve(hash)
      })
    })
  })
}

const comparePassword = (password, encryptedPassword) => {
  return new Promise(async (resolve) => {
    const result = await bcrypt.compare(password, encryptedPassword)
    resolve(result)
  })
}

module.exports = { encryptPassword, comparePassword }
