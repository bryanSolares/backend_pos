const multer = require('multer')
const { Router } = require('express')
const router = Router()
const imageController = require('../controllers/image.controller')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/media'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

router.post('/user/:id', upload.single('profile'), imageController.loadImage)
router.get('/user/:id', imageController.getImage)
router.delete('/user/:id', imageController.deleteImage)

module.exports = router
