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

/* GET home page. */
router.get("/", function (req, res) {
    res.render("noti", {
        title: "AED Notification"
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
