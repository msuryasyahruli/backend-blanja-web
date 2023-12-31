const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");

router
  .get("/", ordersController.getAllOrders)
  .get("/:id", ordersController.getDetailOrders)
  .post("/", ordersController.createOrders)
  .delete("/:id", ordersController.deleteOrders);

module.exports = router;
