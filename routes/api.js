// Express
const express = require('express'),
router = express.Router()

// Configuration requirement
const config = require('../models/config.js')

// Database requirement

/* POST home page. */
router.post('/',(req,res,next)=>{
	const data = req.body.aed_id
	console.log(data)
	res.send(data)
})



module.exports = router