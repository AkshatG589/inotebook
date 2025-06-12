const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,  // Capital 'S'
    required: true
  },
  email: {
    type: String,  // Capital 'S'
    required: true,
    unique: true
  },
  password: {
    type: String,  // Capital 'S'
    required: true
  },
  date: {
    type: Date,    // Capital 'D'
    default: Date.now
  },
});

module.exports = mongoose.model('user', UserSchema);