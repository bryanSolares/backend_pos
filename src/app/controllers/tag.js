/* eslint camelcase: ["off", {properties: "never"}]*/
const tagService = require('../services/tag')
const STATUS = require('../../config/statusCodes')

const createTag = async (req, res) => {
  const data = req.body

  try {
    if (data.cod_tag) {
      const tagFinded = await tagService.getTag(data.cod_tag)
      if (tagFinded) {
        return res.status(STATUS.HTTP_BAD_REQUEST).json({
          message:
            'La categoria que desea crear ya existe en la base de datos, por favor indique otro código'
        })
      }
    }

    const { cod_tag, name, description, status } = await tagService.createTag(
      data
    )
    const tag = {
      cod_tag,
      name,
      description,
      status
    }
    return res
      .status(STATUS.HTTP_CREATED)
      .json({ message: 'Tag created on succesfully', tag })
  } catch (err) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on create tag', err })
  }
}
const updateTag = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const tagFinded = await tagService.getTag(id)
    if (!tagFinded || tagFinded.deleted === true) {
      return res.status(STATUS.HTTP_BAD_REQUEST).json({
        message: 'La categoría a modificar no existe en base de datos'
      })
    }
    await tagService.updateTag(id, data)

    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'Tag updated on succesfully' })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on create tag', error })
  }
}

const deleteTag = async (req, res) => {
  const { id } = req.params
  try {
    const tagFinded = await tagService.getTag(id)
    if (!tagFinded || tagFinded.deleted === true) {
      return res.status(STATUS.HTTP_BAD_REQUEST).json({
        message: 'La categoría a eliminar no existe en base de datos'
      })
    }
    await tagService.deleteTag(id)

    return res
      .status(STATUS.HTTP_OK)
      .json({ message: 'Tag deleted on succesfully' })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on create tag', error })
  }
}

const getTag = async (req, res) => {
  const { id } = req.params
  try {
    const tagFinded = await tagService.getTag(id, [
      'deleted',
      'createdAt',
      'updatedAt'
    ])
    // if (!tagFinded || tagFinded.deleted === true)
    //   return res.status(STATUS.HTTP_BAD_REQUEST).json({ message: 'La categoría a eliminar no existe en base de datos' })

    return res.status(STATUS.HTTP_OK).json({ message: '-', tag: tagFinded })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on get tag', error })
  }
}

const getTags = async (req, res) => {
  const { limit, page } = req.query
  try {
    if (limit < 1 || page < 1) {
      return res
        .status(STATUS.HTTP_BAD_REQUEST)
        .json({ message: 'The query limit or page is not valid' })
    }
    const tags = await tagService.getTags(page, limit, [
      'deleted',
      'createdAt',
      'updatedAt'
    ])
    return res.status(STATUS.HTTP_OK).json({ message: '-', data: tags })
  } catch (error) {
    return res
      .status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: 'Error on get all tags', error })
  }
}

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  getTag,
  getTags
}
