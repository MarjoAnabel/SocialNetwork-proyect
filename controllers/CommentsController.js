const Comment = require('../models/Comment')

const CommentController = {
 async create(req, res) {
   try {
     const comment = await Comment.create(req.body)
     res.status(201).send(comment)
   } catch (error) {
     console.error(error)
     res
       .status(500)
       .send({ message: 'Ha habido un problema al crear el comentario' })
   }
 },

 async insertComment(req, res) {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params._id,
      {$push: { posts: { comment: req.body.comment, userId: req.user._id }},
      }, { new: true })
    res.send(comment)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'There was a problem with your comment' })
  }
},


}
module.exports = CommentController