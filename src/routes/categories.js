const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/categories");

router
  .get("/", categoriesController.getAllCategory)
  .get("/search", categoriesController.searching)
  .post("/", categoriesController.createCategory)
  .delete("/:id", categoriesController.deleteCategory);

module.exports = router;
