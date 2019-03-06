const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  github_Id: Number,
  name: String,
  email: String,
  profile_image: String,
  github: String,
  stacks: [String],
  description: String,
  comment_count: Number,
  create_at: Date
});

module.exports = Users = mongoose.model('users', UserSchema);
