const express = require("express");
const router = express.Router();

const Experience = require("../models/Experience");

/* GET all experiences */
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* CREATE new experience */
router.post("/", async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const saved = await newExperience.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* UPDATE experience */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE experience */
router.delete("/:id", async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;