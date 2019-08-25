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


async function udpateById (id, name, email) {
  const query = MerchantModel.findByIdAndUpdate(id,
    {
      name: name,
      email: email
    }, {
      new: true,
      upsert: true
    })
  var merchant = await query.exec()

  return packageModel(merchant)
}

async function deleteById (id) {
  const query = MerchantModel.findByIdAndDelete(id)
  var merchant = await query.exec()

  return packageModel(merchant)
}

module.exports = {
  find,
  findOne,
  udpateById,
  deleteById
}