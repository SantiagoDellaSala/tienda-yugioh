const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });

    const token = jwt.sign({ userId: newUser.id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch {
    res.status(500).json({ message: 'Error al registrar al usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
