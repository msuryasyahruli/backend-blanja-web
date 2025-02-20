const {
  selectCarts,
  insertCarts,
  updateCart,
  deleteCarts,
  findId: cartId,
  findProduct: productId,
} = require("../model/carts");
const { findId: userId } = require("../model/users");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const cartsController = {
  getCarts: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const sortby = req.query.sortby || "created_at";
      const sort = req.query.sort || "DESC";
      const { rowCount } = await userId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID user is Not Found" });
      }

      const result = await selectCarts(user_id, sortby, sort);
      commonHelper.response(res, result.rows, 200, "Get data success");
    } catch (error) {
      console.error(error);
    }
  },

  createCart: async (req, res) => {
    try {
      const { product_id, user_id, quantity, picked_variant } = req.body;
      const {
        rowCount,
        rows: [cart],
      } = await productId(product_id);

      let result = {};
      if (rowCount) {
        const data = {
          cart_id: cart.cart_id,
          quantity: quantity + cart.quantity,
        };

        result = await updateCart(data);
      } else {
        const cart_id = uuidv4();
        const data = {
          cart_id,
          user_id,
          product_id,
          quantity,
          picked_variant,
        };

        result = await insertCarts(data);
      }
      commonHelper.response(res, result.rows, 201, "Added to cart");
    } catch (error) {
      console.error(error);
    }
  },

  updateCart: async (req, res) => {
    try {
      const cart_id = String(req.params.id);
      const { quantity } = req.body;

      const { rowCount } = await cartId(cart_id);
      if (!rowCount) {
        return res.json({ message: "ID cart is Not Found" });
      }

      const data = {
        cart_id,
        quantity,
      };

      const result = await updateCart(data);
      commonHelper.response(res, result.rows, 200);
    } catch (error) {
      console.error(error);
    }
  },

  deleteCart: async (req, res) => {
    try {
      const cart_id = String(req.params.id);
      const { rowCount } = await cartId(cart_id);
      if (!rowCount) {
        return res.json({ message: "ID cart is Not Found" });
      }

      const result = await deleteCarts(cart_id);
      commonHelper.response(res, result.rows, 200, "Cart deleted");
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = cartsController;
