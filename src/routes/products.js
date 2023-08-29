const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const upload = require("../middleware/upload");

router
  .get("/", productController.getAllProduct)
  .get("/search", productController.searching)
  .get("/:id", productController.getDetailProduct)
  .get("/seller/:id", productController.getSellerProduct)
  .post("/", upload, productController.createProduct)
  .put("/:id", upload, productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = router;
