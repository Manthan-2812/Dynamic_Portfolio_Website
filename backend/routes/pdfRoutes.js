const express = require("express");
const router = express.Router();

const Pdf = require("../models/Pdf");
const upload = require("../middleware/upload");

/* GET pdfs */
router.get("/", async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* CREATE pdf */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const pdf = new Pdf({
      title: req.body.title,
      file: req.file.path
    });

    const saved = await pdf.save();

    res.json(saved);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

/* DELETE pdf */
router.delete("/:id", async (req, res) => {
  try {
    await Pdf.findByIdAndDelete(req.params.id);
    res.json({ message: "PDF deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;