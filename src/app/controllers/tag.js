const tagService = require('../services/tag')

const createTag = async (req, res) => {
  const data = req.body

  try {
    if (data.cod_tag) {
      const tagFinded = await tagService.getTag(data.cod_tag)
      if (tagFinded)
        return res.status(400).json({
          message: 'La categoria que desea crear ya existe en la base de datos, por favor indique otro código'
        })
    }

    const tag = await tagService.createTag(data)
    res.status(201).json({ message: 'Tag created on succesfully', tag })
  } catch (err) {
    res.status(500).json({ message: 'Error on create tag', err })
  }
}
const updateTag = (req, res) => {}

const deleteTag = (req, res) => {}

const getTag = (req, res) => {}

const getTags = (req, res) => {}

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  getTag,
  getTags
}
