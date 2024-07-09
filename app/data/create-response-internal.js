const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const createResponseInternal = async (request) => {
  try {
    const query = `mutation UpdateCustomerQueryTicket {
      updateCustomerQueryTicket(
        id: "${request.params.ticketId}"
        internalUser: true
        name: "INTERNAL USER"
        heading: "${request.payload.heading}"
        body: "${request.payload.queryContent}"
      ) {
        status {
            code
            success
            message
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

    return payload.data.updateCustomerQueryTicket.status
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { createResponseInternal }
