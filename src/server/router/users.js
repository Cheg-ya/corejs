const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Stack = require('../models/Stack');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

router.get('/', (req, res, next) => {
  User.find().lean().exec((err, users) => {
    return res.json(users);
  });
});

router.get('/popular', async (req, res, next) => {
  const { limit, sort } = req.query;
  let reviewers;

  try {
    reviewers = await User.find().populate('stacks')
    .sort({ comments_count: `${sort}` }).limit(parseInt(limit)).lean();

    if (!reviewers.length) return res.json([]);

    return res.json(reviewers);
  } catch(err) {
    return next(new Error('Server Error: /users/popular'));
  }
});

router.get('/:token/posts', async (req, res, next) => {
  const { token } = req.params;
  const { limit, sort } = req.query;

  try {
    const decoded = jwt.verify(token, secretObj.secret);
    const { github_id, email } = decoded;

    const populateQuery = {
      path: 'user_posts',
      options: {
        limit: parseInt(limit),
        sort: `${sort}`,
        populate: [
          { path: 'stacks' },
          { path:'reviewers' },
          { path: 'postedBy' }
        ]
      }
    };

    const user = await User.findOne({ github_id, email }).lean()
    .populate(populateQuery);

    if (user) {
      return res.json(user.user_posts);
    }

    if (uer === null) {
      return next(new Error('No exist user info!'));
    }

  } catch(err) {
    return next(new Error('Invalid Token!'));
  }
});

module.exports = router;
