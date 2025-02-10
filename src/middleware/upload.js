const multer = require("multer");
const { failed } = require("../helper/common");

// manajemen file
const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    const maxSize = 2 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: "File size exceeds 2 MB",
      };
      return cb(error, false);
    }
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      const error = {
        message: "File must be JPEG, JPG, or PNG",
      };
      cb(error, false);
    }
  },
});

const handleUpload = (fieldName) => (req, res, next) => {
  const multerSingle = multerUpload.single(fieldName);
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, err.message.includes("File") ? 400 : 500, err.message);
    }
    next();
  });
};

// Middleware upload
const productThumbnail = handleUpload("product_photo");
const photoProfile = handleUpload("user_photo");

module.exports = { productThumbnail, photoProfile };
