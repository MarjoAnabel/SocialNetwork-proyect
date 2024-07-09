const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostSchema = new mongoose.Schema(
 {
   post: String,
   comments: [
    {
      userId: { type: ObjectId, ref: 'User' },
      comment: String,

    }
   ]

 },
 { timestamps: true }
)

const Post = mongoose.model('Post',PostSchema)
module.exports = Post