const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const getOrganisation = require('./get-organisation')

const createResponse = async (request) => {
  try {
    const name = request.params.internalUser ? 'Internal User' : await getOrganisation(request).name
    const query = `mutation UpdateCustomerQueryTicket {
    updateCustomerQueryTicket(
        id: "${request.params.id}"
        internalUser: "${request.params.internalUser}"
        name: "${name}"
        heading: "${request.params.heading}"
        body: "${request.params.body}"
    ) {
        status {
            code
            success
            message
        }
        customerQueryTicket {
            id
            timestamp
            internalUser
            name
            crn
            sbi
            heading
            body
            responses {
                timestamp
                internalUser
                name
                heading
                body
            }
        }
    }
}``mutation CreateCustomerQueryResponse {
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
