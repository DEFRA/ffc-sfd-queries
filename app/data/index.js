const { createResponse } = require('./create-response')
const { createResponseInternal } = require('./create-response-internal')
const { createQuery } = require('./create-query')
const getOrganisation = require('./get-organisation')
const { getQueries } = require('./get-queries')
const { getQueriesInternal } = require('./get-queries-internal')
const { getTicket } = require('./get-ticket')

module.exports = {
  createResponse,
  createResponseInternal,
  createQuery,
  getOrganisation,
  getQueries,
  getQueriesInternal,
  getTicket
}
