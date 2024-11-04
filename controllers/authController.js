// controllers/authController.js
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ message: 'All fields are required' });
  }
  const user = await UserModel.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.json({ message: 'Incorrect password or email' });
  }
  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({ token, username: user.username });
};
