// Express
const express = require('express'),
router = express.Router()

// Configuration requirement
const config = require('../models/config.js')

// API requirement
const mapClient = require('@google/maps').createClient({
  key: 'AIzaSyAK8MrWHM4riyD4HJ6M5pabVAs09scuLBU'
})

// Database
const db = require('../models/database')

const AED     = require('../models/aed');

/* GET Test page. */
router.get('/test', function (req, res) {
    res.render("test")
})


/* GET Signin page. */
router.get('/signin', function (req, res) {
    res.render("signin", { title: "QUT AED Tracking" })
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
        title: 'QUT AED Tracking',
        monitor: 0,
        detail:1
    })

    console.log(data)
    res.send(data)
})



module.exports = router
