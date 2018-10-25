// Express
const express = require('express'),
router = express.Router()

// Configuration requirement
const config = require('../models/config.js')

// Database requirement
const db = require('../models/database.js')

// Schema
const aed = require('../models/aed.js')

const gp01 = new aed()

/* POST home page. */
router.post('/',(req,res,next)=>{
	const data = req.body.aed_id
	console.log(data)
	res.send(data)
})

router.get('/', (req,res)=>{

})


module.exports = router