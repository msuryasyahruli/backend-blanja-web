const express = require("express");
const router = express.Router();
const sellerController = require("../controller/seller");
const { protect } = require("../middleware/auth");

router
  .post("/register", sellerController.registerSeller)
  .post("/login", sellerController.loginSeller)
  .get("/profile", protect, sellerController.profile)
  .post("/refreshToken", sellerController.refreshToken)
  .get("/:id", sellerController.getDetailsSeller)

module.exports = router;
