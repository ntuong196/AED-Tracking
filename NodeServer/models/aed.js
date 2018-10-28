const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const aed = new Schema({
	// _id: String,
	aed_code: String,
	originlocate: String,
	floor_level: Number,
	is_moving: Boolean,
	online: Boolean
})


module.exports = mongoose.model('Aed', aed)