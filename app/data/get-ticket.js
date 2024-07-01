const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getTicket = async (ticketId) => {
  try {
    const query = `{
      customerQueryTicketById(id: "${ticketId}") {
        id
        heading
        name
        timestamp
        body
        responses {
          name
          timestamp
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
    return payload.data.customerQueryTicketById
  } catch (error) {
    throw new Error(error.message)
  }
}
module.exports = { getTicket }
