// database.js
// Mongodb 3+
const mongoose = require('mongoose')
 
const config = require('./config.js')
    // message = require('./models/message');

const dbUrl = config.dbUrl

mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })

db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
  console.log("DB connection alive");
})

module.exports = db