const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLList } = graphql

const { MerchantModel } = require('./../data-models/Merchant')
const MerchantType = require('./merchant-type')
const Merchants = require('./../query-resolvers/merchant-resolvers')

const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const Transactions = require('./../query-resolvers/transaction-resolvers')

const { UserModel } = require('./../data-models/User')
const UserType = require('./user-type')
const Users = require('./../query-resolvers/user-resolvers')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    //Merchants
    addMerchant: {
      type: MerchantType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve (parentValue, { name, email }) {
        return (new MerchantModel({ name, email })).save()
      }
    },
    deleteMerchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, { id }) {
        return Merchants.deleteById(id)
      }
    },
    deleteMerchants: {
      type: MerchantType,
      args: {
        ids: { type: new GraphQLList(GraphQLString) }
      },
      resolve (parentValue, { ids }) {
        return Merchants.deleteManyByIds(ids)
      }
    },
    updateMerchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        console.log("**********\n\n**********")
        return Merchants.updateById(args)
      }
    },

    // Transactions

    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        cost: { type: GraphQLFloat },
        tax: { type: GraphQLFloat },
        date: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        description: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, merchant_id, cost, tax, date, debit, credit, description }) {
        return (new TransactionModel({ user_id, merchant_id, cost, tax, date, debit, credit, description })).save()
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, { id }) {
        return Transactions.deleteById(id)
      }
    },
    deleteTransactions: {
      type: TransactionType,
      args: {
        ids: { type: new GraphQLList(GraphQLString) }
      },
      resolve (parentValue, { ids }) {
        return Transactions.deleteManyByIds(ids)
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        cost: { type: GraphQLFloat },
        tax: { type: GraphQLFloat },
        date: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        description: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.updateById(args)
      }
    },

    // Users

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
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, { id }) {
        return Users.deleteById(id)
      }
    },
    deleteUsers: {
      type: UserType,
      args: {
        ids: { type: new GraphQLList(GraphQLString) }
      },
      resolve (parentValue, { ids }) {
        return Users.deleteManyByIds(ids)
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.updateById(args)
      }
    }
  })
})

module.exports = mutation
