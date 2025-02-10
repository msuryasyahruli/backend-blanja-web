const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const { productThumbnail } = require("../middleware/upload");

router
  .get("/", productsController.getAllProducts)
  .get("/search", productsController.searching)
  .get("/:id", productsController.getDetailProduct)
  .get("/seller/:id", productsController.getSellerProducts)
  .post("/", productThumbnail, productsController.createProduct)
  .patch("/:id", productThumbnail, productsController.updateProduct)
  .delete("/:id", productsController.deleteProduct);

module.exports = router;
