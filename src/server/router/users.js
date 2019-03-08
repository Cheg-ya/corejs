const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Stack = require('../models/Stack');

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

module.exports = router;
