const { GET } = require('../constants/http-verbs')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { getQueries } = require('../data/get-queries')

module.exports = {
  method: GET,
  path: '/view-all',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    const queries = await getQueries(request)
    return h.view('view-all-queries', { queries })
  }
}
