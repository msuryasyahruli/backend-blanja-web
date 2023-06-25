const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const { protect,validationRole } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  hitCacheProductDetail,
  clearCacheProductDetail,
} = require("../middleware/redis");

router
  .get("/", protect, productController.getAllProduct)
  .get("/search", protect, productController.searching)
  .get("/:id", protect, hitCacheProductDetail, productController.getDetailProduct)
  .post("/", protect, validationRole, upload.single("photo"), productController.createProduct)
  .put("/:id", protect, validationRole, upload.single("photo"), clearCacheProductDetail, productController.updateProduct)
  .delete("/:id", protect, validationRole, clearCacheProductDetail, productController.deleteProduct);

module.exports = router;
