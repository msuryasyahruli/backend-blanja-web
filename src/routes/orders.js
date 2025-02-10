const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");

router
  .get("/:id", ordersController.getOrders)
  .post("/", ordersController.createOrders)
  .patch("/:id", ordersController.updateOrder)
  .delete("/:id", ordersController.deleteOrders);

module.exports = router;
