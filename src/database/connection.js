const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connect(config.DATABASE_URL, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

const getDbConn = () => db;

module.exports = getDbConn;
