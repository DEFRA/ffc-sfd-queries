const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getQueries = async (sbi) => {
  try {
    const query = `query {
      allCustomerQueryTickets {
        customerQueriesByTicketId {
            code
            success
            message
            ticketId
            _ts
            crn
            sbi
            customerQueryResponses {
                heading
                body
            }
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
    return payload.data.allCustomerQueryTickets.customerQueriesByTicketId.filter(query => query.sbi === sbi)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { getQueries }
