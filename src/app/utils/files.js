const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/media'))
  },
  filename(req, file, cb) {
    const { id } = req.params
    const extension = file.originalname.split('.').pop()
    cb(null, `profile_${id}.${extension}`)
  }
})

const upload = multer({
  storage,
  limits: { fieldSize: 8000000 },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
      return cb(null, false)
    }
    cb(null, true)
  }
})

module.exports = upload
