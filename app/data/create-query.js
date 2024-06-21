const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const getOrganisation = require('./get-organisation')

const createQuery = async (request) => {
  const organisation = await getOrganisation(request)
  const query = `mutation CreateCustomerQueryTicket {
    createCustomerQueryTicket(
          crn: "${request.auth.credentials.crn}"
          sbi: "${organisation.sbi}"
          heading: "${request.payload.queryTopic}"
          body: "${request.payload.queryContent}") {
        code
        success
        message
        ticketId
        _ts
        crn
        sbi
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
}
module.exports = { createQuery }
