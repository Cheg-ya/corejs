const express = require('express');
const mongoose = require('mongoose');
const users = require('./router/users.js');

mongoose.connect('mongodb://admin_song:123123123@cluster0-shard-00-00-4hrjv.mongodb.net:27017,cluster0-shard-00-01-4hrjv.mongodb.net:27017,cluster0-shard-00-02-4hrjv.mongodb.net:27017/CORE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once('open', err => {
  console.log('DB connected');
});

db.on('error', err => {
  console.error(err);
});

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use('/api/users', users);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
