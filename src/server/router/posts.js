const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res, next) => {
  const { limit, sort } = req.query;
  const populateQuery = [{ path: 'postedBy' }, { path: 'reviewers' }, { path: 'stacks' }];

  try {
    const posts = await Post.find({ close: false, public_state: true })
    .sort({ created_at: `${sort}` }).limit(parseInt(limit)).populate(populateQuery).lean();

    return res.json(posts);

  } catch(err) {
    return next(new Error('Server Error: /posts'));
  }
});

module.exports = router;
