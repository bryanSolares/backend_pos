const userService = require('../services/user')
const authUtils = require('../utils/auth.utils')

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const userFinded = await userService.getUser(username)
    if (!userFinded) return res.status(404).json({ message: 'User not found on database' })
    const validPassword = await userService.comparePassword(password, userFinded.password)
    if (!validPassword) return res.status(401).json({ message: 'User or password incorrect, try again' })
    const token = authUtils.generateToken(userFinded.cod_user, {
      name: userFinded.name,
      lastname: userFinded.lastname,
      email: userFinded.email
    })

    res.status(200).json({ message: 'Welcome', token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error on generating token', error })
  }
}

const renewToken = async (req, res) => {
  try {
    const data = req.headers['authorization']
    if (!data) return res.status(400).json({ message: 'Token not exists in request' })
    const oldToken = authUtils.cleanToken(data)
    const payload = authUtils.dataTokenValid(oldToken)
    const userFinded = await userService.getUser(payload.sub)
    if (!userFinded) return res.status(400).json({ message: 'User asigned of this token not found' })
    const token = authUtils.generateToken(userFinded.cod_user, {
      name: userFinded.name,
      lastname: userFinded.lastname,
      email: userFinded.email
    })

    res.status(200).json({ message: 'Your new token', token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error on renew token', error })
  }
}

module.exports = { login, renewToken }
