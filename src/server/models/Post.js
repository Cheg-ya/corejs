const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new Schema({
  postedBy: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  public_state: {
    type: Boolean,
    required: true
  },
  close: {
    type: Boolean,
    required: true
  },
  code: [
    {
      type: Object,
      default: []
    }
  ],
  stacks: [
    {
      type: ObjectId,
      ref: 'Stack',
      default: []
    }
  ],
  reviewers: [
    {
      type: ObjectId,
      ref: 'User',
      default: []
    }
  ],
  comments: [
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

module.exports = Post = mongoose.model('Post', PostSchema);
