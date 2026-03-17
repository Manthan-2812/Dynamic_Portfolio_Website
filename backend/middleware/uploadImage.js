const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/images",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"]
  }
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
