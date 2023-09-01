const express = require("express");
const router = express.Router();
const addressController = require("../controller/address");

router
  .get("/:id", addressController.getAddress)
  .post("/", addressController.createAddress)
  .put("/:id", addressController.updateAddress)
  .delete("/:id", addressController.deleteAddress)

module.exports = router;
