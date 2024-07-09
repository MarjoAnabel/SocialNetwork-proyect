const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const bcryptj = require('bcryptjs')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password, age } = req.body;
      if (!name || !email || !password || !age) {
          return res.status(400).send('Error: Falta algún campo por rellenar');
      }
      const passwordHash = await bcryptj.hash(password, 10);
      const user = await User.create({
          ...req.body,
          password: passwordHash,
          role: 'user',
      });

      res.status(201).send({ message: 'Usuario registrado con éxito', user });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error: Ha ocurrido un error al registrar el usuario');
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
    res.send(user)
  } catch (error) {
    console.error(error)
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