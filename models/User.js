const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
   age: Number,
   tokens: [],
 }, { timestamps: true }
)

UserSchema.methods.toJSON = function () {
  const user = this._doc
  delete user.tokens
  delete user.password
  return user
 }
 

const User = mongoose.model('User', UserSchema)

module.exports = User