const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find(criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne(id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function udpateById (id, user_id, merchant_id, cost, tax, debit, credit, description) {
  const query = TransactionModel.findByIdAndUpdate(id,
    {
      user_id: user_id,
      merchant_id: merchant_id,
      cost: cost,
      tax: tax,
      debit: debit,
      credit: credit,
      description: description
    }, {
      new: true,
      upsert: true
    })
  var transaction = await query.exec()

  return packageModel(transaction)
}

async function deleteById (id) {
  const query = TransactionModel.findByIdAndDelete(id)
  var transaction = await query.exec()

  return packageModel(transaction)
}

module.exports = {
  find,
  findOne,
  udpateById,
  deleteById
}
