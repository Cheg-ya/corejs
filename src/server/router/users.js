const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.get('/', (req, res, next) => {
  Users.find().lean().exec((err, users) => {
    return res.json(users);
  });
});

router.get('/popular', async (req, res, next) => {
  const { limit, sort } = req.query;
  let reviewers;

  try {
    reviewers = await Users.find().lean().sort({ comment_count: `${sort}` }).limit(parseInt(limit));
  } catch(err) {
    return next(new Error('Server Error'));
  }

  if (!reviewers.length) return res.json([]);

  return res.json(reviewers);
});

module.exports = router;
