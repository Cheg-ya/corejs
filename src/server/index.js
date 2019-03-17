const express = require('express');
const mongoose = require('mongoose');
const users = require('./router/users');
const auth = require('./router/auth');
const posts = require('./router/posts');
const mongoUrl = process.env.DB_URL || require('../config/database.js');

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', err => {
  console.log('DB connected');
});

db.on('error', err => {
  console.error(`Mongoose default connection error: ${err}`);
});

const app = express();

require('./middleWares/index')(app);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);

app.use(function(req, res, next) {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
