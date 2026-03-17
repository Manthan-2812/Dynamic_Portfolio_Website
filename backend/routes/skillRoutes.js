const express = require("express");
const router = express.Router();

const Skill = require("../models/Skill");

/* GET skills */
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* CREATE skill */
router.post("/", async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const saved = await skill.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* UPDATE skill */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE skill */
router.delete("/:id", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;