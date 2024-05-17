const mongoose = require("mongoose");
const config = require("../config/config");

// connect to mongo
mongoose.connect(config.DATABASE_URL, {});

const db = mongoose.connection;
// on error
db.on("error", console.error.bind(console, "connection error:"));

// if connected
db.once("open", function () {
  console.log("Connected to the database");
});
