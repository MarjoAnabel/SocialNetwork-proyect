const Comment = require('../models/Comment')

const CommentController = {
 async create(req, res) {
   try {
     const post = await Comment.create(req.body)
     res.status(201).send(post)
   } catch (error) {
     console.error(error)
     res
       .status(500)
       .send({ message: 'Ha habido un problema al crear el comentario' })
   }
 },
}
module.exports = CommentController