const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const { UserModel } = require('./../data-models/User')
const UserType = require('./user-type')
const Users = require('./../query-resolvers/user-resolvers')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        cost: { type: GraphQLFloat },
        tax: { type: GraphQLFloat },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        description: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, merchant_id, cost, tax, debit, credit, description }) {
        return (new TransactionModel({ user_id, merchant_id, cost, tax, debit, credit, description })).save()
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve (parentValue, { name, email }) {
        return (new UserModel({ name, email })).save()
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve (parentValue, { id, name, email }) {
        return Users.udpateById(id, name, email).save()
      }
    }
  })
})

module.exports = mutation
