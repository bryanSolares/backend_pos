const userService = require('../services/user')
const authUtils = require('../utils/auth')
const STATUS = require('../../config/statusCodes')

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const userFinded = await userService.getUser(username)
    if (!userFinded) {
      return res
        .status(STATUS.HTTP_NOT_FOUND)
        .json({ message: 'User not found on database' })
    }
    const validPassword = await userService.comparePassword(
      password,
      userFinded.password
    )
    if (!validPassword) {
      return res
        .status(STATUS.HTTP_UNAUTHORIZED)
        .json({ message: 'User or password incorrect, try again' })
    }
    const token = authUtils.generateToken(userFinded.cod_user, {
      name: userFinded.name,
      lastname: userFinded.lastname,
      email: userFinded.email
    })

    return res.status(STATUS.HTTP_OK).json({ message: 'Welcome', token })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on generating token', error })
  }
}

const renewToken = async (req, res) => {
  try {
    const data = req.headers.authorization
    if (!data) {
      return res
        .status(STATUS.HTTP_BAD_REQUEST)
        .json({ message: 'Token not exists in request' })
    }
    const oldToken = authUtils.cleanToken(data)
    const payload = authUtils.dataTokenValid(oldToken)
    const userFinded = await userService.getUser(payload.sub)
    if (!userFinded) {
      return res
        .status(STATUS.HTTP_BAD_REQUEST)
        .json({ message: 'User asigned of this token not found' })
    }
    const token = authUtils.generateToken(userFinded.cod_user, {
      name: userFinded.name,
      lastname: userFinded.lastname,
      email: userFinded.email
    })

    return res.status(STATUS.HTTP_OK).json({ message: 'Your new token', token })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on renew token', error })
  }
}

module.exports = { login, renewToken }
