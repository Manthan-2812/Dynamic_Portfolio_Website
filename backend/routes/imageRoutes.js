const express = require("express");
const router = express.Router();

const Image = require("../models/Image");
const uploadImage = require("../middleware/uploadImage");

/* GET images */
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* CREATE image (file upload) */
router.post("/", uploadImage.single("file"), async (req, res) => {
  try {
    const url = req.file ? req.file.path : req.body.url;
    const { category } = req.body;
    const image = new Image({ url, category });
    const saved = await image.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE image */
router.delete("/:id", async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;