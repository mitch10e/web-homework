const { MerchantModel } = require('../data-models/Merchant')
const { packageModel } = require('./utils')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? MerchantModel.find(criteria)
    : MerchantModel.find()

  const merchants = await query.exec()

  return packageModel(merchants)
}

async function findOne (id) {
  const query = MerchantModel.findById(id)
  const merchant = await query.exec()

  return packageModel(merchant)[0] || null
}

module.exports = {
  find,
  findOne
}
