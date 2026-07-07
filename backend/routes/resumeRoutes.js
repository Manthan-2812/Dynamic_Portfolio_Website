const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const upload = require("../middleware/upload");

/* GET latest resume */
router.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* UPLOAD / REPLACE resume */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    await Resume.deleteMany({});
    const resume = new Resume({ url: req.file.path });
    const saved = await resume.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
