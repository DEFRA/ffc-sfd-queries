const { SFD_VIEW } = require('ffc-auth/scopes')
const { GET, POST } = require('../constants/http-verbs')
const { createResponseInternal } = require('../data')
const { getTicket } = require('../data')

module.exports = [{
  method: GET,
  path: '/internal/query/{ticketId}',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    const data = await getTicket(request.params.ticketId)
    return h.view('query-internal', { data })
  }
},
{
  method: POST,
  path: '/internal/query/{ticketId}',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    const payload = await createResponseInternal(request)
    if (payload.code === 200) {
      return h.redirect(`/queries/internal/query/${request.params.ticketId}`)
    } else {
      throw new Error(payload.message)
    }
  }

}
]
