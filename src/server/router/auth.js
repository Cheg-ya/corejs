const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const secret = process.env.AUTH || require('../../config/credential').jwtSecret;

const createToken = loginData => {
  const { email } = loginData;
  const userId = loginData._id.toString();

  return jwt.sign({
    id: userId,
    email
  },
  secret, {
    algorithm: 'HS256',
    expiresIn: '3h'
  });
};

router.post('/github', async (req, res, next) => {
  const { github_id, avatar_url, html_url, email, username } = req.body;

  try {
    const existUser = await User.findOne({ github_id }).lean();  

    if (existUser) {
      const token = createToken(existUser);

      return res.json({ message: 'success', token, user: existUser });
      
    } else if (existUser === null) {
      const user = new User({
        github_id,
        name: username,
        email,
        profile_image: avatar_url,
        github_url: html_url
      });

      try {
        const result = await user.save();
        const token = createToken(result.toObject());

        return res.json({ message: 'success', token });

      } catch(err) {
        return next(new Error('Server Error, Can not save Data'));
      }
    }

  } catch(err) {
    return next(new Error('Server Error occurs!'));
  }
});

router.post('/check', async (req, res, next) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, secret);
    const { email, id } = decoded;
    const user = await User.findOne({ email, _id: id }).lean();

    if (user) {
      return res.json({ message: 'valid', user });
    }

  } catch(err) {
    return next(new Error('Invalid Token!'));
  }
});

module.exports = router;
