const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {

  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
  ];

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const mimeType = file.mimetype;

  if (
    allowedExtensions.includes(extension) &&
    allowedMimeTypes.includes(mimeType)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;