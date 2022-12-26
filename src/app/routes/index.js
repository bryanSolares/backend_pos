const { Router } = require('express')
const router = Router()
const userRoutes = require('./user.routes')
const imageRoutes = require('./image.routes')

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to my api BACKEND POS' })
})

router.use('/user', userRoutes)
router.use('/image', imageRoutes)

module.exports = router
