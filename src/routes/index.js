const express = require("express");
const router = express.Router();
const productRouter = require("./products");
const categoryRouter = require("./category");
const ordersRouter = require("./orders");
const customerRouter = require("./customer");
const sellerRouter = require("./seller");

router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/orders", ordersRouter);
router.use("/customer", customerRouter);
router.use("/seller", sellerRouter);

module.exports = router;
