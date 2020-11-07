const { Schema, model} = require('mongoose');

const schema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true }
  },
  {
    collection : 'articles'
  }
);

module.exports = model('Articles', schema);
