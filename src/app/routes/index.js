const { Router } = require('express')
const router = Router()
const userRoutes = require('./user.routes')
const authRoutes = require('./auth.routes')
const tagRoutes = require('./tag')

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to my api BACKEND POS' })
})

router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/tag', tagRoutes)

module.exports = router
