// Configuration requirement
const config = require("../models/config.js")

// Database requirement
const database = require("../models/database.js")

module.exports = {
  eventEmitor: function(router, io) {
    router.post("/", (req, res) => {
      // AED code
      const aed_code = req.params.aed_code
      // post data
      const data = req.body

      if (data) {
        res.send(200)
        console.log(data)
        io.socket.emit("gps", data)
        console.log("Finish emit")
      }
    })
  }
}
