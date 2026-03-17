const express = require("express");
const router = express.Router();

const Certificate = require("../models/Certificate");
const uploadImage = require("../middleware/uploadImage");

/* GET all certificates */
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* CREATE certificate (file upload) */
router.post("/", uploadImage.single("file"), async (req, res) => {
  try {
    const url = req.file ? req.file.path : req.body.url;
    const { title } = req.body;
    const certificate = new Certificate({ url, title });
    const saved = await certificate.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE certificate */
router.delete("/:id", async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
