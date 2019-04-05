const users = require('./router/users');
const posts = require('./router/posts');
const auth = require('./router/auth');
const express = require('express');
const DB = require('./database');

const app = express();

require('./middleWares/index.js')(app);

if (process.env.NODE_ENV === 'production') {
  console.log('Production');

  app.get('/*', (req, res, next) => {
    if (!req.path.includes('api')) {
      return res.sendFile('index.html', { root: './dist/' });
    }

    next();
  });

} else {
  console.log('Development');
}

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);

app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
