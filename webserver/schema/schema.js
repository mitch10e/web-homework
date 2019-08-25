const graphql = require('graphql')
const { GraphQLSchema } = graphql

const RootQueryType = require('./root-query-type')
const Mutations = require('./mutations')

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations
})
