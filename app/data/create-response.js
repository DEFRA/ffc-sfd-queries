const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const createResponse = async (request) => {
  try {
    const query = `mutation CreateCustomerQueryResponse {
    createCustomerQueryResponse(
        ticketId: "${request.params.ticketId}"
        heading: "${request.payload.queryTopic}"
        body: "${request.payload.queryContent}")
         {
        code
        success
        message
        id
        ticketId
        _ts
        internalUser
        name
        heading
        body
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

    return payload
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createResponse }
