const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    cost: { type: GraphQLFloat },
    tax: { type: GraphQLFloat },
    date: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    description: { type: GraphQLString }
  })
})

module.exports = TransactionType
