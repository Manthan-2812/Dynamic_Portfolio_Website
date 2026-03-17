const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  org: {
    type: String,
    required: true
  },
  timeline: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Experience", experienceSchema);