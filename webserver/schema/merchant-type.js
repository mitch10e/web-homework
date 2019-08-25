/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const { TransactionModel: Transaction } = require(path.join('..', 'data-models', 'Transaction'))
const TransactionType = require('./transaction-type')

const MerchantType = new GraphQLObjectType({
  name: 'Merchant',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve (parentValue, args) {
        return Transaction.find({ merchant_id: args.id }).populate('transaction')
      }
    }
  })
})

module.exports = MerchantType
