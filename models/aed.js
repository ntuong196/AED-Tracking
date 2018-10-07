const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const Aed = new Schema({
	// _id: String,
	aed_id: String,
	origin_locate: String,
	current_locate: [Number, Number]
})


module.exports = mongoose.model('Aed', Aed)