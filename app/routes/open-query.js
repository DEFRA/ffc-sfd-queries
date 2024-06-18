const Wreck = require('@hapi/wreck')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { GET, POST } = require('../constants/http-verbs')
const { serverConfig } = require('../config')

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
    const query = `mutation 
    CreateQuery {
      createQuery(
          crn: "${request.auth.credentials.crn}"
          sbi: "1"
          heading: "${request.payload.queryTopic}"
          body: "${request.payload.queryContent}"
      ) {
          code
          success
          message
          customerQuery {
              id
              crn
              sbi
              heading
              body
          }
      }
  }`

    const { payload } = await Wreck.post(serverConfig.dataHost, {
      headers: {
        crn: request.auth.credentials.crn,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({ query }),
      json: true
    })
    if (payload.data.createQuery.code === 201) {
      return h.view('confirmation', { reference: payload.data.createQuery.customerQuery.id })
    } else {
      throw new Error(payload.message)
    }
  }

}
]
