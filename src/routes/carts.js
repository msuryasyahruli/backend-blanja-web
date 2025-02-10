const express = require("express");
const cartsController = require("../controller/carts");
const router = express.Router();

router
  .get("/:id", cartsController.getCarts)
  .post("/", cartsController.createCart)
  .put("/:id", cartsController.updateCart)
  .delete("/:id", cartsController.deleteCart);

module.exports = router;
