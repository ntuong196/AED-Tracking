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

// GPS Processing
const gpsHandler = require("./../models/gps")

/* GET Signin page. */
// TODO: ADD AUTHENTICATION
router.get("/signin", function(req, res) {
  res.render("signin", { title: "QUT AED Tracking" })
})

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", {
    title: "QUT AED Tracking"
  })
})

/* GET AED list. */
router.get("/list", function(req, res) {
  Aed.find(function(err, aed_kit) {
    if (err) return console.error(err)
    data = Object.values(aed_kit)
    res.render("list", {
      title: "QUT AED List",
      aed_code: data[0].aed_code,
      level: data[0].floor_level,
      moving: data[0].is_moving,
      location: data[0].location,
      online: data[0].online
    })
  })
})

/* GET AED detail */
router.get("/:aed_code", function(req, res) {
  const aed_code = req.params.aed_code
  Aed.find(function(err, data) {
    if (err) return console.error(err)
    const geoData = Location.getDatabase(aed_code)

    geoData
      .find({ speed: { $gt: 0 } })
      .sort({ time: -1 })
      .limit(1)
      .exec(function(err, geo) {
        if (err) return console.error(err)
        res.render("aed", {
          title: "QUT AED List",
          aed_code: data[0].aed_code,
          lat: geo[0].lat,
          long: geo[0].long,
          level: gpsHandler.checkFloorLevel(geo[0].alt),
          time: geo[0].time,
          moving: gpsHandler.checkMoving(geo[0].speed),
          location: data[0].location,
          online: gpsHandler.checkRecordTime(geo[0].time)
        })
      })
  })
})

// Aed.find(function (err, data) {
//   if (err) return console.error(err)
//   const geoData = Location.getDatabase("gp01")

//   geoData
//     .find()
//     .sort({ time: -1 })
//     .limit(1)
//     .exec(function (err, geo) {
//       if (err) return console.error(err)
//       console.log(Date.parse(geo[0].time))
//     })
// })

/* POST home page. */
// router.post("/", (req, res, next) => {
//   const id = req.body.aed_id
//   res.render("index", {
//     title: id
//   })
//   console.log(data)
//   res.send(data)
// })

module.exports = router
