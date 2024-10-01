const Post = require('../models/Post')

const PostController = {
  
  async create(req, res) {
    const { namepost } = req.body;
    const userId = req.user._id; 
    if (!namepost || !userId) {
      return res.status(400).send('Error: Falta algún campo por rellenar');
    }
  
    try {
      const post = await Post.create({ namepost, userId });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha habido un problema al crear el post' });
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
    req.params._id, { $push: { likes: req.user_id } },{ new: true })
    res.send(post)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "There was a problem with your request" })
    }
  },

  async deletelikes(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id }}, // Usar $pull para eliminar el like
        { new: true } // Para devolver el documento actualizado
      );
      if (!post) {
        return res.status(404).send({ message: 'Post no encontrado' });
      }
      res.send({ post, message: 'Like eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Hubo un problema al eliminar el like',
      });
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
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      // Populate post author (userId)
      .populate({ path: 'userId', select: 'name + email' })
      // Populate comments with username from userId
      .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name + email' },
      })
      .limit(limit)
      .skip((page - 1) * limit);
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Problema al mostrar los posts' });
  }
},

async getPostsByName(req, res) {
  try {
    const postName = new RegExp(req.params.postName, 'i'); // Crear regex para búsqueda case insensitive
    const posts = await Post.find({ name: postName }); // Asegúrate de que estás buscando en el campo correcto
    res.send(posts); // Debería devolver un array (puede estar vacío)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error al buscar los posts' });
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