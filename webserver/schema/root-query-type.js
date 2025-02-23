const graphql = require('graphql')
const MerchantType = require('./merchant-type')
const Merchants = require('./../query-resolvers/merchant-resolvers')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')
const UserType = require('./user-type')
const Users = require('./../query-resolvers/user-resolvers')

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    merchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.findOne(args.id)
      }
    },
    merchants: {
      type: GraphQLList(MerchantType),
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.find(args)
      }
    },
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findOne(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        date: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.find(args)
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.findOne(args.id)
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.find(args)
      }
    }
  })
})

module.exports = RootQuery
