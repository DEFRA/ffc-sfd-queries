require('./insights').setup()
const { serverConfig } = require('./config')
const Hapi = require('@hapi/hapi')

async function createServer () {
  const server = Hapi.server({
    port: process.env.PORT
  })

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/view-context'))
  await server.register(require('hapi-auth-jwt2'))
  await server.register(require('./plugins/auth'))
  await server.register(require('./plugins/auth-refresh'))
  await server.register(require('./plugins/router'), {
    routes: { prefix: serverConfig.routePrefix }
  })
  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/crumb'))
  await server.register(require('./plugins/logging'))
  await server.register(require('./plugins/picker'))

  return server
}
module.exports = { createServer }
