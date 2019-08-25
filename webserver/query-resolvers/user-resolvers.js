const { UserModel } = require('../data-models/User')
const { packageModel } = require('./utils')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? UserModel.find(criteria)
    : UserModel.find()

  const users = await query.exec()

  return packageModel(users)
}

async function findOne (id) {
  const query = UserModel.findById(id)
  const user = await query.exec()

  return packageModel(user)[0] || null
}

async function udpateById (id, name, email) {
  const query = UserModel.findByIdAndUpdate(id,
    {
      name: name,
      email: email
    }, {
      new: true,
      upsert: true
    })
  var user = await query.exec()

  return packageModel(user)[0] || null
}

module.exports = {
  find,
  findOne,
  udpateById
}
