const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Pdf", pdfSchema);