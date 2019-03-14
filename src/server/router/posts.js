const verifyToken = require('../middleWares/middleWares').verifyToken;
const ServerError = require('../Error/index').ServerError;
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const { limit, sort } = req.query;
  const populateQuery = [
    { path: 'postedBy' },
    { path: 'reviewers' },
    { path: 'stacks' },
    {
      path: 'comments',
      options: {
        populate: {
          path: 'reply'
        }
      }
    }
  ];

  try {
    const posts = await Post.find({ close: false, public_state: true })
    .sort({ created_at: `${sort}` }).limit(parseInt(limit)).populate(populateQuery).lean();

    return res.json(posts);

  } catch(err) {
    return next(new ServerError('Server Error: /posts'));
  }
});

router.get('/:post_id', verifyToken, async (req, res, next) => {
  const postId = req.params.post_id;

  try {
    const populateQuery = [
      { path: 'postedBy' },
      { path: 'reviewers'},
      { path: 'stacks' },
      {
        path: 'comments',
        options: {
          populate: [
            { path: 'reply' }
          ]
        }
      }
    ];

    const targetPost = await Post.findById(postId).populate(populateQuery).lean();

    return res.json({ post: targetPost });

  } catch(err) {
    next(new ServerError(err.message));
  }
});

module.exports = router;
