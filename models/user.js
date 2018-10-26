const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const user = new Schema({
  // _id: String,  
  qut_id: String,
  fullname: String,
  email: String,
  permission: String
});

module.exports = mongoose.model("User", user);

/*
So we use mongo DB to store our data in the form json
This is the interface for high-level user or QUT staff
to access and modify the database.

User can easily create or delete a document as they want.

As you can see here, this is the location of a device 
has been recorded in the past few day
And this is the discription of a kit ...


The main advantage is this type of database is easy to scale
We can easily add a new kit by insert a document

*/