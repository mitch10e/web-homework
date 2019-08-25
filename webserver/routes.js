'use strict'
const exGraphql = require('express-graphql')
const graphqlSchema = require('./schema/schema.js')
const path = require('path')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    const data = require('./views/welcome.json')

    res.header("Content-Type",'application/json')
    res.send(JSON.stringify(data))
  })

  // GraphQL routes
  app.use(
    '/graphql',
    exGraphql({
      schema: graphqlSchema,
      graphiql: true,
      pretty: true
    })
  )

  // API routes

  app.use(/(?!\/graphql)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}
