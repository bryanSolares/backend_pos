const { Router } = require('express')

const router = Router()

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to my api BACKEND POS' })
})

module.exports = router
