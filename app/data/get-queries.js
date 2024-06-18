const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const getOrganisation = require('./get-organisation')

const getQueries = async (request) => {
  try {
    const organisation = await getOrganisation(request)
    const query = `query {
    customerQueriesBySbi(sbi: "${organisation.sbi}") {
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
