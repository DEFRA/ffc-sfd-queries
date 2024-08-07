const routes = [].concat(
  require('../routes/home'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/asset'),
  require('../routes/open-query'),
  require('../routes/view-all-queries'),
  require('../routes/view-all-queries-internal'),
  require('../routes/query'),
  require('../routes/query-internal')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
