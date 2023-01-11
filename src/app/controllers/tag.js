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

    const { cod_tag, name, description, status } = await tagService.createTag(data)
    const tag = { cod_tag, name, description, status }
    res.status(201).json({ message: 'Tag created on succesfully', tag })
  } catch (err) {
    res.status(500).json({ message: 'Error on create tag', err })
  }
}
const updateTag = async (req, res) => {
  const id = req.params.id
  const data = req.body
  try {
    const tagFinded = await tagService.getTag(id)
    if (!tagFinded || tagFinded.deleted === true)
      return res.status(400).json({ message: 'La categoría a modificar no existe en base de datos' })
    await tagService.updateTag(id, data)

    res.status(200).json({ message: 'Tag updated on succesfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error on create tag', err })
  }
}

const deleteTag = async (req, res) => {
  const id = req.params.id
  try {
    const tagFinded = await tagService.getTag(id)
    if (!tagFinded || tagFinded.deleted === true)
      return res.status(400).json({ message: 'La categoría a eliminar no existe en base de datos' })
    await tagService.deleteTag(id)

    res.status(200).json({ message: 'Tag deleted on succesfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error on create tag', err })
  }
}

const getTag = async (req, res) => {
  const id = req.params.id
  try {
    const tagFinded = await tagService.getTag(id, ['deleted', 'createdAt', 'updatedAt'])
    // if (!tagFinded || tagFinded.deleted === true)
    //   return res.status(400).json({ message: 'La categoría a eliminar no existe en base de datos' })

    res.status(200).json({ message: '-', tag: tagFinded })
  } catch (error) {
    res.status(500).json({ message: 'Error on get tag', err })
  }
}

const getTags = async (req, res) => {
  const { limit, page } = req.query
  try {
    if (limit < 1 || page < 1) {
      return res.status(400).json({ message: 'The query limit or page is not valid' })
    }
    const tags = await tagService.getTags(page, limit, ['deleted', 'createdAt', 'updatedAt'])
    res.status(200).json({ message: '-', data: tags })
  } catch (error) {
    res.status(500).json({ message: 'Error on get all tags', err })
  }
}

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  getTag,
  getTags
}
