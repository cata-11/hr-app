const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  birthdate: {
    type: Object,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  manager: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Employee', schema);
