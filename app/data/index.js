const { createResponse } = require('./create-response')
const { createQuery } = require('./create-query')
const getOrganisation = require('./get-organisation')
const { getQueries } = require('./get-queries')
const { getTicket } = require('./get-ticket')

module.exports = {
  createResponse,
  createQuery,
  getOrganisation,
  getQueries,
  getTicket
}
