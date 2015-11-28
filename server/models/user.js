var mongoose  = require('mongoose');

// module.exports.userSchema = new mongoose.Schema({
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  }
});


var User = mongoose.model('User', userSchema);

module.exports = User;