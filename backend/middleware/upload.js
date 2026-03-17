const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio",
    resource_type: "raw"   // THIS FIXES PDF ISSUE
  }
});

const upload = multer({ storage });

module.exports = upload;