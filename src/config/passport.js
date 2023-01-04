const fs = require('fs')
const path = require('path')

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { JWT_PUBLIC_KEY } = require('./dotenv')
const { JWT_ALGORITHM } = require('./dotenv')
const { getUser } = require('../app/services/user.service')
const authUtils = require('../app/utils/auth.utils')

const tokenExtractor = (req) => {
  const data = req.headers['authorization']
  return authUtils.cleanToken(data)
}

const strategyOptions = {
  jwtFromRequest: tokenExtractor,
  secretOrKey: JWT_PUBLIC_KEY,
  algorithms: [JWT_ALGORITHM]
}

const verifyAutenticToken = (payload, done) => {
  const { sub } = payload
  getUser(sub)
    .then((user) => {
      if (!user) return done(null, false)
      return done(null, { ...user })
    })
    .catch((error) => {
      done(error, false)
    })
}

passport.use(new JwtStrategy(strategyOptions, verifyAutenticToken))
