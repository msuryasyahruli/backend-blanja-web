const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
// const {  validationRole, protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
// const {
//   hitCacheProductDetail,
//   clearCacheProductDetail,
// } = require("../middleware/redis");

router
  .get("/",  productController.getAllProduct)
  .get("/search",  productController.searching)
  .get(
    "/:id",
    
    // hitCacheProductDetail,
    productController.getDetailProduct
  )
  .post(
    "/",
    // protect,
    // validationRole,
    upload,
    productController.createProduct
  )
  .put(
    "/:id",
    // protect,
    // validationRole,
    upload,
    // clearCacheProductDetail,
    productController.updateProduct
  )
  .delete(
    "/:id",
    // protect,
    // validationRole,
    // clearCacheProductDetail,
    productController.deleteProduct
  );

module.exports = router;
