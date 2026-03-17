const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["painting", "photography"],
    required: true
  }
});

module.exports = mongoose.model("Image", imageSchema);