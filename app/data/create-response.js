const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const getOrganisation = require('./get-organisation')

const createResponse = async (request) => {
  try {
    let name
    if (request.payload.internalUser !== 'false') {
      name = 'Internal User'
    } else {
      const organisation = await getOrganisation(request)
      name = organisation.name
    }

    const query = `mutation UpdateCustomerQueryTicket {
    updateCustomerQueryTicket(
        id: "${request.params.ticketId}"
        internalUser: ${request.payload.internalUser !== 'false'}
        name: "${name}"
        heading: "${request.payload.heading}"
        body: "${request.payload.queryContent}"
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
