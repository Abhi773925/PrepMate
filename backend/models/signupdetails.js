const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('signupdetails', signupDetailsSchema);
