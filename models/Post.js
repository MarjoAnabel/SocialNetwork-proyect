const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
 {
   name: String,
   date: Date,
 },
 { timestamps: true }
)

const Post = mongoose.model('Post',PostSchema)
module.exports = Post