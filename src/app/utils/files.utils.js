const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/media'))
  },
  filename: function (req, file, cb) {
    const id = req.params.id
    const extension = file.originalname.split('.').pop()
    cb(null, `profile_${id}.${extension}`)
  }
})

const upload = multer({
  storage,
  limits: { fieldSize: 8000000 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
      return cb(null, false)
    }
    cb(null, true)
  }
})

module.exports = upload
