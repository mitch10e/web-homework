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

async function updateById (args) {
  const id = args['id']
  if (!id) {
    return null
  } else {
    delete args.id
  }

  const query = UserModel.findByIdAndUpdate(id, args, {
      new: true,
      upsert: true
    })
  var user = await query.exec()

  return packageModel(user)[0] || null
}

async function deleteById (id) {
  const query = UserModel.findByIdAndDelete(id)
  var user = await query.exec()

  return packageModel(user)[0] || null
}

module.exports = {
  find,
  findOne,
  updateById,
  deleteById
}
