const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer");
const { protect } = require("../middleware/auth");
const photoProfile = require("../middleware/uploadProfile");

router
  .post("/register", customerController.registerCustomer)
  .post("/login", customerController.loginCustomer)
  .get("/profile", protect, customerController.profile)
  .post("/refreshToken", customerController.refreshToken)
  .get("/detail/:id", customerController.getDetailsCustomer)
  .put("/:id", customerController.updateCustomer)
  .put("/photo/:id", photoProfile, customerController.updateCustomerPhoto);

module.exports = router;
