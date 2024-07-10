const Post = require('../models/Post')

const PostController = {
  
 async create(req, res) {
  const { post} = req.body;
      if (!post) {
          return res.status(400).send('Error: Falta algún campo por rellenar');
      }
      req.body.role = 'post';
   try {
     const post = await Post.create(req.body, req.user._id)
     res.status(201).send(post)
   } catch (error) {
     console.error(error)
     res
       .status(500)
       .send({ message: 'Ha habido un problema al crear el post' })
   }
 },

 async update(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    )
    res.send({ message: 'Post actualizada correctamente', post })
  } catch (error) {
    console.error(error)
  }
},

async insertComment(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params._id,
      {$push: { comments: { comment: req.body.comment, userId: req.user._id }},
      }, { new: true })
    res.send(post)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Hubo un problema con el Post' })
  }
},

async like(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
    req.params._id, { $push: { likes: req.user._id } },{ new: true })
    res.send(post)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "There was a problem with your request" })
    }
  },

  async deletelikes(req, res) {
    try {
      const post = await Post.findByIdAndDelete(
        req.params._id, { $push: { likes: req.user._id }})
      res.send({ post, message: 'Like eliminado' })
    } catch (error) {
      console.error(error)
      res.status(500).send({
          message: 'Hubo un problema al eliminar el post',
        })
    }
  },



async delete(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params._id)
    res.send({ post, message: 'Post eliminado' })
  } catch (error) {
    console.error(error)
    res.status(500).send({
        message: 'Hubo un problema al eliminar el post',
      })
  }
},

 async getAllPages(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query
    const posts = await Post.find()
      .populate ('comments.userId')
      .limit(limit)
      .skip((page - 1) * limit)
    res.send(posts)
  } catch (error) {
    console.error(error)
  }
},

 async getPostsByName(req, res) {
  try {
    const name = new RegExp(req.params.name, 'i')
    const posts = await Post.find({ name })
    res.send(posts)
  } catch (error) {
    console.log(error)
  }
},

async getById(req, res) {
  try {
    const post= await Post.findById(req.params._id)
    res.send(post)
  } catch (error) {
    console.error(error)
  }
},

}

module.exports = PostController