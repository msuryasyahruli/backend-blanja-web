const express = require("express");
const router = express.Router();
const customerController = require("../controller/costumer");
const { protect } = require("../middleware/auth");

router
  .post("/register", customerController.registerCustomer)
  .post("/login", customerController.loginCustomer)
  .get("/profile", protect, customerController.profile)
  .post("/refreshToken", customerController.refreshToken)
  .put("/:id", customerController.updateCustomer);

module.exports = router;
