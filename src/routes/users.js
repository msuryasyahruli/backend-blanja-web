const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");
const { protect } = require("../middleware/auth");
const { photoProfile } = require("../middleware/upload");

router
  .post("/register", usersController.register)
  .post("/login", usersController.login)
  .get("/profile", protect, usersController.profile)
  .post("/refresh-token", usersController.refreshToken)
  .patch("/:id", photoProfile, usersController.updateProfile)
  .patch("/:id/store", usersController.updateStore)
  .delete("/:id/picture", usersController.deletePicture);

module.exports = router;
