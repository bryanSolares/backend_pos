const tagModel = require('../models/tag')
const utils = require('../utils/utils')

/**
 *
 * @param {{cod_tag: string, name: string, description: string, status?: boolean}} tag
 * @returns {Promise<JSON>} Data of tag created
 *
 */
const createTag = async (tag) => {
  const dataTag = { ...tag }
  if (!dataTag.cod_tag) dataTag.cod_tag = utils.createUUID()
  return await tagModel.create(dataTag, { raw: true })
}

/**
 *
 * @param {string} id Id tag for updated
 * @param {JSON} tag Data for updated
 * @returns {Promise<number>} Number of afected values
 *
 */
const updateTag = async (id, tag) => await tagModel.update(tag, { where: { cod_tag: id } })

/**
 *
 * Modifica el parámetro de eliminado en la base de datos, se elimina directamente
 * el objeto, para conservar en futuros eventos necesarios
 *
 * @param {string} id Id of tag delete
 * @returns {Promise<number>} Number of afected values
 *
 */
const deleteTag = async (id) => await tagModel.update({ deleted: true }, { where: { cod_tag: id } })

/**
 *
 * Eliminar la etiqueta o categoria, directamente de la base de datos.
 * Este métod es destructivo, se recomienda usar prudentemente y analizar
 * el caso de uso en donde se desea emplear
 *
 * @param {string} id Id of destroy tag
 * @returns {Promise<number>} Number of afected values
 *
 */
const destroyTag = async (id) => await tagModel.destroy({ where: { cod_tag: id } })

/**
 *
 * Obtiene una etiqueta o categoria de la base de datos, en función
 * del cod_tag proporcionado, también se pueden indicar que propiedades se
 * desean omitir al momento de retonar la información
 *
 * @param {string} id Id tag of search on database
 * @param {[]} excludeFields Array of String of excluded params return
 * @returns {Promise<JSON>} Tag searched
 *
 */
const getTag = async (id, excludeFields) =>
  await tagModel.findOne({ where: { cod_tag: id }, raw: true, attributes: { exclude: excludeFields } })

/**
 *
 * Obtiene todo el listado de etiquetas o categorias de la base de datos,
 * se recupera por porciones, por defecto se devolverán 10 registros, pero esto
 * puede ser modificable, se ha paginado la información para evitar una
 * devolución total de los datos
 * @param {number} page Number of page of data return
 * @param {number} limit Number max of items of data return
 * @param {[]} excludeFields Array of String of excluded params return
 * @returns
 *
 */

const getTags = async (page = 1, limit = 10, excludeFields) => {
  const offset = parseInt((page - 1) * limit)
  const { rows, count } = await tagModel.findAndCountAll({
    where: { deleted: false },
    raw: true,
    limit,
    offset,
    attributes: { exclude: excludeFields },
    order: [['cod_tag', 'ASC']]
  })
  const totalPages = Math.ceil(count / limit)

  return { pages: totalPages, tags: rows }
}

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  destroyTag,
  getTag,
  getTags
}
