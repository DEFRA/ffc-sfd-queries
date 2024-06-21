const { SFD_VIEW } = require('ffc-auth/scopes')
const { GET, POST } = require('../constants/http-verbs')
const { createQuery } = require('../data/create-query')

module.exports = [{
  method: GET,
  path: '/open-query',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: (request, h) => {
    return h.view('open-query')
  }
},
{
  method: POST,
  path: '/open-query',
  options: { auth: { strategy: 'jwt', scope: [SFD_VIEW] } },
  handler: async (request, h) => {
    const payload = await createQuery(request)
    if (payload.data.createCustomerQueryTicket.code === 201) { // no status code available yet
      return h.view('confirmation', { reference: payload.data.createCustomerQueryTicket.ticketId })
    } else {
      throw new Error(payload.message)
    }
  }

}
]
