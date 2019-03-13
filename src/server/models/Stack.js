const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stackSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Stack = mongoose.model('Stack', stackSchema);
