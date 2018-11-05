// Express
const express = require("express"),
    router = express.Router()

// Configuration requirement
const config = require("../models/config.js")

// Database requirement
const database = require("../models/database.js")

// Schema
const Aed = require("../models/aed.js")

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
router.get("/list", function (req, res) {
  Aed.find(function (err, aed_kit) {
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
router.get("/gp01", function (req, res) {
  Aed.find(function (err, aed_kit) {
    if (err) return console.error(err)
    data = Object.values(aed_kit)
    res.render("aed", {
      title: "QUT AED List",
      aed_code: data[0].aed_code,
      level: data[0].floor_level,
      moving: data[0].is_moving,
      location: data[0].location,
      online: data[0].online
    })
  })
})

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
