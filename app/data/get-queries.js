const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getQueries = async (sbi) => {
  try {
    const query = `query {
      customerQueryTicketsBySbi(sbi: "${sbi}") {
        customerQueryTickets {
            id
            timestamp
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

    const queries = payload.data.customerQueryTicketsBySbi.customerQueryTickets
    queries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    return queries
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { getQueries }
