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
    .find({})
    .sort({ time: -1 })
    .limit(1)
    .exec(function(err, geo) {
      if (err) return console.error(err)
      res.status(200).json(geo)
    })
})


module.exports = router
