const mongoose = require("mongoose"),
  Schema = mongoose.Schema

const location = new Schema({
  // _id: String,
  long: Number,
  lat: Number,
  alt: Number,
  speed: Number,
  time: Date,
  is_moving: Boolean
})

module.exports = function(collectionName) {
  return mongoose.model("Location", location, collectionName)
}
