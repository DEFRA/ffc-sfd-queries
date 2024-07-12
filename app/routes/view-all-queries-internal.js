const { GET } = require('../constants/http-verbs')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { getQueriesInternal } = require('../data')

module.exports = {
  method: GET,
  path: '/internal/view-all-queries-internal',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    const queries = await getQueriesInternal()
    return h.view('view-all-queries-internal', { queries })
  }
}
