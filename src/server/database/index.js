const mongoose = require('mongoose');

let DB_URL;

if (process.env.NODE_ENV === "production") {
  DB_URL = process.env.DB_URL;
} else {
  DB_URL = require('../../config/credential').dbUrl;
}

mongoose.connect(DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected!');
});

db.on('error', err => {
  console.error(`DB connection error: ${err.message}`);
});

module.exports = {
  mongoose
};
