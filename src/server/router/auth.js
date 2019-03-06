const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

const createToken = loginData => {
  const { github_Id, email, username } = loginData;

  return jwt.sign({
    github_Id,
    email,
    name: username
  },
  secretObj.secret, {
    algorithm: 'HS256',
    expiresIn: '7d'
  });
}

router.post('/github', async (req, res, next) => {
  const { github_Id, avatar_url, html_url, email, username } = req.body;

  try {
    const existUser = await User.findOne({ github_Id }).lean();  

    if (existUser) {
      const token = createToken(existUser);

      return res.json({ message: 'success', token });

    } else if (existUser === null) {
      const user = new User({
        github_Id,
        name: username,
        email,
        profile_image: avatar_url,
        github: html_url,
        stacks: [],
        description: '',
        comment_count: 0,
        created_at: new Date()
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

module.exports = router;
