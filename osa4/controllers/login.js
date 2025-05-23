const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user && (await bcrypt.compare(password, user.passwordHash));

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET || 'devsecret');

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
