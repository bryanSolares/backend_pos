const tagModel = require('../models/tag')
const utils = require('../utils/utils')

/**
 *
 * @param {{cod_tag: string, name: string, description: string, status?: boolean}} tag
 * @returns {Promise<JSON>} Data of tag created
 */
const createTag = async (tag) => {
  let dataTag = { ...tag }
  if (!dataTag.cod_tag) dataTag.cod_tag = utils.createUUID()
  return await tagModel.create(dataTag, { raw: true })
}

/**
 *
 * @param {string} id Id tag of search on database
 * @param {[]} fieldNotReturn Array of String of excluded params return
 * @returns {Promise<JSON>} Tag searched
 */
const getTag = async (id, fieldNotReturn) => {
  return await tagModel.findOne({ where: { cod_tag: id }, raw: true })
}

module.exports = {
  createTag,
  getTag
}
