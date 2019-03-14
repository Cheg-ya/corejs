const verifyToken = require('../middleWares/middleWares').verifyToken;
const Stack = require('../models/Stack');
const Post = require('../models/Post');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

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

const getStackIds = async stackList => {
  const stackContainer = {};
  const stackIds = [];

  stackList.forEach(name => {
    stackContainer[name] = true;
  });

  const existStack = await Stack.find({ name: { $in: stackList } }).lean();

  existStack.forEach(stack => {
    const id = stack._id;
    const name = stack.name;

    if (stackContainer[name]) {
      stackContainer[name] = false;
      stackIds.push(id);
    }
  });

  for (let name in stackContainer) {
    if (stackContainer[name]) {
      const newStack = new Stack({ name });
      const result = await newStack.save();
      const id = result.toObject()._id;

      stackIds.push(id);
    }
  }

  return stackIds;
};

router.post('/:user_id/posts', verifyToken, async (req, res, next) => {
  const { title, description, public_state, code, stacks } = req.body;
  const { email, id } = res.locals.verifiedData;

  try {
    const author = await User.findOne({ _id: id, email }).lean();
    const authorId = author._id.toString();

    if (author === null) {
      return next(new Error('No exist user info!'));
    }

    if (author) {
      const stackIds = await getStackIds(stacks);

      const post = new Post({
        postedBy: authorId,
        title,
        description,
        public_state,
        code,
        stacks: stackIds
      });

      const newPost = await post.save();
      const newPostId = newPost.toObject()._id.toString();

      const updateQuery = {
        '$push': {
          'user_posts': newPostId
        }
      };

      const populateQuery = [{ path: 'stacks' }, { path: 'postedBy' }];

      await User.findByIdAndUpdate(authorId, updateQuery, { new: true }).populate('user_posts').lean();

      const updatedPost = await Post.populate(newPost, populateQuery);

      return res.json({ post: updatedPost.toObject() });
    }

  } catch (err) {
    return next(new ServerError('Invalid Token!'));
  }
});

module.exports = router;
