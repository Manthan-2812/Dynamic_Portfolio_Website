const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);
