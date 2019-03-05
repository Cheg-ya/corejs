const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.get('/', (req, res, next) => {
  Users.find().lean().exec((err, users) => {
    return res.json(users);
  });
});

router.get('/popular', (req, res, next) => {
  Users.find().lean().sort({ comment_count: -1 }).limit(4).exec((err, users) => {
    if (err) return res.sendStatus(500);

    if (!users.length) return res.json([]);

    return res.json(users);
  });
});

module.exports = router;
