// const mongoose = require("mongoose");
import mongoose from "mongoose"

const Schema = mongoose.Schema;

/* Creating a new schema for the activity model. */
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);   