const express = require("express");
const router = express.Router();
const productRouter = require("./products");
const categoriesRouter = require("./categories");
const ordersRouter = require("./orders");
const usersRouter = require("./users");
const addressRouter = require("./address");
const cartsRouter = require("./carts");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
router.use("/products", productRouter);
router.use("/categories", categoriesRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);
router.use("/address", addressRouter);
router.use("/carts", cartsRouter);

module.exports = router;
