const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

router
  .post("/register", customerController.registerCustomer)
  .post("/login", customerController.loginCustomer)
  .get("/profile", protect, customerController.profile)
  .post("/refreshToken", customerController.refreshToken)
  .get("/detail/:id", customerController.getDetailsCustomer)
  .put("/:id", upload, customerController.updateCustomer);

module.exports = router;
