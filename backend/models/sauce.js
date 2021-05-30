const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: {type: String, required: true},
  manufacturer: {type: String, required: true},
  description: {type: String, required: true},
  mainPepper: {type: String, required: true},
  imageUrl: {type: String, required: true},
  heat: { type: Number, required: true },   //number between 1 and 10
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked : {type: String, required: true},  //tableau
  usersDisliked : {type: String, required: true},   //tableau
});

module.exports = mongoose.model('Sauce', sauceSchema);