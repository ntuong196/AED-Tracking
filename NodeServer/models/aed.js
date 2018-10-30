const mongoose = require("mongoose"),
  Schema = mongoose.Schema

const aed = new Schema(
  {
    // _id: String,
    aed_code: { type: String, unique: 1 },
    location: String,
    floor_level: Number,
    is_moving: Boolean,
    online: Boolean
  },
  { versionKey: false }
)

module.exports = mongoose.model("Aed", aed, "aed")
