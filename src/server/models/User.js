const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  github_id: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  comment_count: {
    type: Number,
    default: 0
  },
  profile_image: {
    type: String,
    default: './public/default_profile.png'
  },
  description: {
    type: String,
    default: ''
  },
  github_url: String,
  stacks: [
    {
      type: ObjectId,
      ref: 'Stack',
      default: []
    }
  ],
  user_posts: [
    {
      type: ObjectId,
      ref: 'Post',
      default: []
    }
  ],
  comments: [
    {
      type: ObjectId,
      ref: 'Comment',
      default: []
    }
  ],
  reviewing_posts: [
    {
      type: ObjectId,
      default: []
    }
  ],
  private_requests: [
    {
      type: ObjectId,
      default: []
    }
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = User = mongoose.model('User', UserSchema);
