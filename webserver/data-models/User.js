const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, default: null },
  email: { type: String, default: null }
})

const model = mongoose.model('user', UserSchema)

module.exports = {
  UserModel: model,
  UserSchema,
  default: UserSchema
}
