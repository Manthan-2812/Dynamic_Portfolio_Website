const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  collaborators: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    required: true
  },
  repo: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Project", projectSchema);