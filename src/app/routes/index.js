const { Router } = require('express')

const router = Router()
const userRoutes = require('./user')
const authRoutes = require('./auth')
const tagRoutes = require('./tag')
const productRoutes = require('./product')

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to my api BACKEND POS' })
})

router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/tag', tagRoutes)
router.use('/product', productRoutes)

module.exports = router
