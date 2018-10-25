const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const Aed = new Schema({
	// _id: String,
	aed_id: String,
	discription: String,
	origin_locate: [Number,Number],
	current_locate: [Number, Number],
	is_moving: Boolean
})


module.exports = mongoose.model('Aed', Aed)