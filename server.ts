const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();

/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB"; 


app.use(express.json());
app.use(cors());


app.get("/", (_req, _res) => { 
  _res.send("Hello World!");
});

/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("Server stated on port 5000"));
  })
  .catch((err: Error) => {
    console.log(err);
  }); 