const { SFD_VIEW } = require('ffc-auth/scopes')
const { GET, POST } = require('../constants/http-verbs')
const { createResponse } = require('../data/create-response')
const { getTicket } = require('../data/get-ticket')

module.exports = [{
  method: GET,
  path: '/query/{ticketId}',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    const data = await getTicket(request.params.ticketId)
    return h.view('query', { data })
  }
},
{
  method: POST,
  path: '/query/{ticketId}',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    await createResponse(request)
    return h.redirect(`/queries/query/${request.params.ticketId}`)
  }

}
]
