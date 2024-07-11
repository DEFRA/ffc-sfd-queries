const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getQueriesInternal = async () => {
  try {
    const query = `query {
      allCustomerQueryTickets {
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

    return payload.data.allCustomerQueryTickets.customerQueryTickets
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { getQueriesInternal }
