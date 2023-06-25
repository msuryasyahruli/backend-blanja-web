const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  hitCacheProductDetail,
  clearCacheProductDetail,
} = require("../middleware/redis");

router
  .get("/", protect, productController.getAllProduct)
  .get("/search", productController.searching)
  .get("/:id", hitCacheProductDetail, productController.getDetailProduct)
  .post("/", upload.single("photo"), productController.createProduct)
  .put("/:id", clearCacheProductDetail, productController.updateProduct)
  .delete("/:id", clearCacheProductDetail, productController.deleteProduct);

module.exports = router;
