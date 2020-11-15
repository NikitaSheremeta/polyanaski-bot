const { Schema, model} = require('mongoose');

const schema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    created: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
  },
  {
    _id : false
  },
  {
    collection : 'users'
  }
);

module.exports = model('Users', schema);
