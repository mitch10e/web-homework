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

async function updateById (args) {
  const id = args['id']
  if (!id) {
    return null
  } else {
    delete args.id
  }

  const query = TransactionModel.findByIdAndUpdate(id, args,
    {
      new: true,
      upsert: true
    })
  var transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function deleteById (id) {
  const query = TransactionModel.findByIdAndDelete(id)
  var transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

module.exports = {
  find,
  findOne,
  updateById,
  deleteById
}
