const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const stackSchema = new Schema({
  _id: ObjectId,
  name: {
    type: String,
    required: true
  }
});

module.exports = Stack = mongoose.model('Stack', stackSchema);
