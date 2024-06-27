const { GET } = require('../constants/http-verbs')
const { SFD_VIEW } = require('ffc-auth/scopes')
const getOrganisation = require('../data/get-organisation')
const { getQueries } = require('../data/get-queries')

module.exports = {
  method: GET,
  path: '/view-all',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    const organisation = await getOrganisation(request)
    const queries = await getQueries(organisation.sbi)
    return h.view('view-all-queries', { queries, organisation })
  }
}
