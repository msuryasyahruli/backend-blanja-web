const {
  selectOrders,
  selectOrderItems,
  insertOrder,
  insertItem,
  updateOrder,
  deleteOrder,
  findId,
} = require("../model/orders");
const { findId: userId } = require("../model/users");
const { deleteByUser } = require("../model/carts");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const ordersController = {
  getOrders: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const { rowCount } = await userId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID user is Not Found" });
      }

      const orders = await selectOrders(user_id);

      const result = await Promise.all(
        orders.rows.map(async (data) => {
          const items = await selectOrderItems(data.order_id);
          const orderItems = items.rows.map((item) => ({
            order_item_id: item.order_item_id,
            product_id: item.product_id,
            product_name: item.product_name,
            product_thumbnail: item.product_thumbnail,
            picked_variant: item.picked_variant,
            product_price: item.product_price,
            quantity: item.quantity,
            store_name: item.store_name,
          }));

          const calculatedTotalPrice = orderItems.reduce(
            (acc, item) => acc + item.product_price,
            0
          );

          return {
            order_id: data.order_id,
            products: orderItems,
            total_price: calculatedTotalPrice,
            order_status: data.order_status,
            payment_method: data.payment_method,
            delivery_status: data.delivery_status,
            created_at: data.created_at,
          };
        })
      );

      commonHelper.response(res, result, 200, "Get data success");
    } catch (error) {
      console.error(error);
    }
  },

  createOrders: async (req, res) => {
    try {
      const {
        order_status,
        total_price,
        payment_method,
        delivery_status,
        products,
        user_id,
      } = req.body;

      const order_id = uuidv4();
      const data = {
        order_id,
        order_status,
        total_price,
        payment_method,
        delivery_status,
        user_id,
      };

      const result = await insertOrder(data);

      const orderItems = products.map(
        ({ cart_id, product_id, quantity, product_price, picked_variant }) => {
          const data = {
            order_item_id: cart_id,
            order_id,
            product_id,
            quantity,
            product_price,
            picked_variant,
          };

          insertItem(data);
        }
      );

      await Promise.all(orderItems);

      await deleteByUser(user_id);

      commonHelper.response(res, result.rows, 201, "Orders created");
    } catch (error) {
      console.error(error);
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order_id = String(req.params.id);
      const { order_status, delivery_status } = req.body;

      const { rowCount } = await findId(order_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      const data = {
        order_id,
        order_status,
        delivery_status,
      };

      const result = await updateOrder(data);
      commonHelper.response(res, result.rows, 200);
    } catch (error) {
      console.error(error);
    }
  },

  deleteOrders: async (req, res) => {
    try {
      const order_id = String(req.params.id);
      const { rowCount } = await findId(order_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      deleteOrder(order_id).then((result) =>
        commonHelper.response(res, result.rows, 200, "Orders deleted")
      );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ordersController;
