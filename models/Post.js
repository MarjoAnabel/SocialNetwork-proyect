const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostSchema = new mongoose.Schema(
 {
   name: String,
   date: Date,

   userId: {
    type: ObjectId,
    ref: 'User',
   },

   postId: {
    type: ObjectId,
    ref: 'Post',
   },

 },
 { timestamps: true }
)

const Post = mongoose.model('Post',PostSchema)
module.exports = Post