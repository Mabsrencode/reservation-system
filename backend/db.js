require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DBURL;
mongoose.connect(
  dbUrl
  //     , {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo db connection error");
});
connection.on("connected", () => {
  console.log("Mongo db connection successful");
});

module.exports = mongoose;
