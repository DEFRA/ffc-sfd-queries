const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const getQueries = async (sbi) => {
  try {
    const query = `query {
    customerQueriesBySbi(sbi: "${sbi}") {
        sbi
        customerQueries {
            id
            crn
            sbi
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
    return payload.data.customerQueriesBySbi.customerQueries
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { getQueries }
