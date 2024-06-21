const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getTicket = async (ticketId) => {
  try {
    const query = `{
      customerQueriesByTicketId(ticketId: "${ticketId}") {
          ticketId
          code
          success
          message
          _ts
          crn
          sbi
          customerQueryResponses {
              id
              ticketId
              _ts
              internalUser
              name
              heading
              body
          }
      }
  }`
    const { payload } = await Wreck.post(serverConfig.dataHost, {
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({ query }),
      json: true
    })
    return payload.data.customerQueriesByTicketId
  } catch (error) {
    throw new Error(error.message)
  }
}
module.exports = { getTicket }
