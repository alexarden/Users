var express = require("express");
var mongoose = require("mongoose");
var cors = require('cors');
var app = express();
/* Loading the environment variables from the .env file. */
require("dotenv").config();
var PORT = process.env.PORT || 5000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";
app.use(express.json());
app.use(cors());
app.get("/", function (_req, _res) {
    _res.send("Hello World!");
});
/* Connecting to the database and then starting the server. */
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(function () {
    app.listen(PORT, console.log("Server stated on port 5000"));
})
    .catch(function (err) {
    console.log(err);
});
