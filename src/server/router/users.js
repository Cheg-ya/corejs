const secretObj = require('../../config/jwt');
const Stack = require('../models/Stack');
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, secretObj.secret);
  } catch(err) {
    return next(new ServerError('Invalid Token!'));
  }

  const { id, email } = decoded;

  res.locals.verifiedData = {
    id,
    email
  };

  next();
};

router.get('/popular', async (req, res, next) => {
  const { limit, sort } = req.query;

  try {
    const reviewers = await User.find().populate('stacks')
    .sort({ comments_count: `${sort}` }).limit(parseInt(limit)).lean();

    if (!reviewers.length) return res.json([]);

    return res.json(reviewers);

  } catch(err) {
    return next(new Error('Server Error: /users/popular'));
  }
});

router.get('/:user_id/posts', verifyToken, async (req, res, next) => {
  const { email, id } = res.locals.verifiedData;
  const { limit, sort } = req.query;
  const populateQuery = {
    path: 'user_posts',
    options: {
      limit: parseInt(limit),
      sort: {
        created_at: sort
      },
      populate: [
        { path: 'stacks' },
        { path:'reviewers' },
        { path: 'postedBy' }
      ]
    }
  };

  try {
    const user = await User.findOne({ _id: id, email })
    .lean().populate(populateQuery);

    if (user) {
      return res.json(user.user_posts);
    }

    if (user === null) {
      return next(new ServerError('No exist user info'));
    }

  } catch(err) {
    return next(new ServerError('Invalid Token'));
  }
});

class ServerError extends Error {
  constructor(message) {
    super();
    this.status = 500;
    this.message = message || 500;
  }
}

router.post('/:user_id/posts', verifyToken, async (req, res, next) => {
  const { title, description, isPublic, code, stacks } = req.body; // code 정보 가공해서 스키마에 맞게 넣고 프론트 action, reducer work and check
  const { email, id } = res.locals.verifiedData;
  debugger;
  try {
    const author = await User.findOne({ _id: id, email }).lean();
    const authorId = author._id.toString();

    if (author === null) {
      return next(new Error('No exist user info!'));
    }

    if (author) {
      const post = new Post({
        postedBy: authorId,
        title: 'test',
        description: 'test',
        public_state: true,
        close: false,
        code: [],
        stacks: []
      });

      let newPost = await post.save();
      newPost = newPost.toObject();

      const postId = newPost._id.toString();
      const updateQuery = {
        '$push': {
          'user_posts': postId
        }
      };

      const updatedUser = await User.findByIdAndUpdate(authorId, updateQuery, { new: true }).lean();

      return res.json({ updatedUser, newPost }); // store new post data into redux store to see updated post right after saving
    }

  } catch (err) {
    return next(new ServerError('Invalid Token!'));
  }
});

module.exports = router;
