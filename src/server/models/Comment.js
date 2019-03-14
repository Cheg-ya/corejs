const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new Schema({
  postedBy: {
    type: ObjectId,
    ref: 'User',
    require: true
  },
  review_line: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  reply: [
    {
      type: ObjectId,
      ref: 'Comment',
      default: []
    }
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);
