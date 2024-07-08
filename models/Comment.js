const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
 {
   name: String,
   date: Date,
 },
 { timestamps: true }
)

const Comment = mongoose.model('Comment', PostSchema)
module.exports = Comment