const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  id: Number,
  by: Number,
  title: String,
  created_at: Date,
  description: String,
  public: Boolean,
  close: Boolean,
  stacks: Array,
  comments: Array,
  reviewers: Array,
  code: String,
  profile_image: String
});

module.exports = Posts = mongoose.model('posts', PostSchema);
