const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const bcryptj = require('bcryptjs')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
  async register(req, res, next) {
    try {
      const passwordHash = await bcryptj.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        role: 'user',
        password: passwordHash,
      });
      res.status(201).send({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
      error.origin = 'usuario'
      next(error)
    }
  },


 async login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Error: Usuario no encontrado');
    }
    const isPasswordValid = await bcryptj.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Error: Contraseña incorrecta');
    }
    const token = jwt.sign({ _id: user._id }, jwt_secret);
    if (user.tokens.length > 4) user.tokens.shift();
    user.tokens.push(token);
    await user.save();
    res.send({ message: 'Bienvenid@ ' + user.name, token });
} catch (error) {
    console.error(error);
    res.status(500).send('Error: Ha ocurrido un error al iniciar sesión');
}
},

async getInfo(req, res) {
  try {
    const user = await User.findById(req.user._id)
    .populate({
      path: "postIds",
      populate: {
        path: "commentIds",
      },
    })

    .populate ('wishlist')
    res.send(user)
  } catch (error) {
    console.error(error)
  }
},

async update(req, res) {
  try {
    if (req.body.password) {
      const passwordHash = await bcrypt.hashSync(req.body.password, 10)
      req.body.password = passwordHash
    }
    const user = await User.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    )
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' })
    }
    res.send({ message: 'Usuario actualizado con éxito', user })
  } catch (error) {
    error.origin = usuario
    next(error)
  }
},

async getUsersByName(req, res) {
  try {
    const name = new RegExp(req.params.name, 'i')
    const users = await User.find({ name })
    res.send(users)
  } catch (error) {
    console.log(error)
  }
},

async getById(req, res) {
  try {
    const user = await User.findById(req.params._id)
    res.send(user)
  } catch (error) {
    console.error(error)
  }
},

async like(req, res) {
  try {
  await User.findByIdAndUpdate(req.user._id,
    { $push: { wishList: req.params._id } },
    { new: true })
     res.send(product)
   } catch (error) {
     console.error(error)
     res.status(500).send({ message: "Hubo un problema con la solicitud" })
   }
 },


async logout(req, res) {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { tokens: req.headers.authorization },
    })
    res.send({ message: 'Desconectado con éxito' })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'Hubo un problema al intentar desconectar al usuario',
    })
  }
}

}

module.exports = UserController