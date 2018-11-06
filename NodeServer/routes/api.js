// Express
const express = require("express"),
  router = express.Router()

// Configuration requirement
const config = require("../models/config.js")

// Database requirement
const database = require("../models/database.js")

// Schema
const Aed = require("../models/aed.js")
const Location = require("./../models/location")

// GPS handler
const gpsHandler = require("./../models/gps")

/* GET AED LIST */
router.get("/aed", (req, res, next) => {
  Aed.find(function(err, aed_kit) {
    if (err) return console.error(err)
    res.json(aed_kit)
  })
})

// GET SPECIFIC AED LOCATION

router.get("/aed/:aed_code", (req, res) => {
  const aed_code = req.params.aed_code
  // Intances
  const geoData = Location.getDatabase(aed_code)

  geoData
    .find({speed:{$gt:0}})
    .sort({ time: -1 })
    .limit(1)
    .exec(function(err, geo) {
      if (err) return console.error(err)
      res.status(200).json(geo)
    })
})

/* Check moving AED kit */
router.get("/check", (req, res, next) => {
  const geoData = Location.getDatabase("gp01")

  geoData
    .find()
    .sort({ time: -1 })
    .limit(1)
    .exec(function (err, geo) {
      if (err) return console.error(err)
      // data = Object.values(geo)
      is_moving = gpsHandler.checkMoving(geo[0].speed)
      console.log(is_moving)
      res.status(200).json(is_moving)
    })
})


module.exports = router
