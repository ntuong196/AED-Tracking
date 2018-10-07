// Express
const express = require('express'),
router = express.Router()

// Configuration requirement
const config = require('../models/config.js')

// API requirement
const mapClient = require('@google/maps').createClient({
  key: 'AIzaSyAK8MrWHM4riyD4HJ6M5pabVAs09scuLBU'
})

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { 
        title: 'QUT AED Tracking'
    })
})

/* POST home page. */
router.post('/',(req,res,next)=>{
    const id = req.body.aed_id
    res.render('index', {
        title: 'QUT AED Tracking'
    })

    console.log(data)
    res.send(data)
})

/* GET AED info page. */
router.get('/:aed_id', function(req, res) {
    const aed_id = req.params.aed_id
    res.render('index', { 
        'title': 'QUT AED Tracking'
    })
})


module.exports = router
