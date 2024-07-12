const { SFD_VIEW } = require('ffc-auth/scopes')
const { GET, POST } = require('../constants/http-verbs')
const { createResponseInternal } = require('../data')
const { getTicket } = require('../data')
const { sender } = require('../config')

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
    await sender.sendMessage({
      body: {
        id: request.params.ticketId,
        responses: [
          {
            internalUser: true,
            name: 'INTERNAL USER',
            heading: 'You have a new response to your query',
            body: request.payload.queryContent
          }
        ]
      },
      type: 'query-internal',
      source: 'ffc-sfd-queries'
    })

    const payload = await createResponseInternal(request)
    if (payload.code === 200) {
      return h.redirect(`/queries/internal/query/${request.params.ticketId}`)
    } else {
      throw new Error(payload.message)
    }
  }
}]
