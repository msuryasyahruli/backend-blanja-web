const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

router
  .get("/", categoryController.getAllCategory)
  .post("/", categoryController.createCategory)
  .delete("/:id", categoryController.deleteCategory);

module.exports = router;
