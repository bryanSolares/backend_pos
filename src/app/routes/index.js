const { Router } = require('express')
const router = Router()
const userRoutes = require('./user.routes')

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to my api BACKEND POS' })
})

router.use('/user', userRoutes)

module.exports = router
