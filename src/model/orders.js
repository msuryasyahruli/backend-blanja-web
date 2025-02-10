const Pool = require("../config/db");

const selectOrders = (user_id) => {
  return Pool.query(`SELECT orders.order_id,
      orders.total_price,
      orders.order_status,
      orders.payment_method,
      orders.delivery_status,
      orders.created_at
    FROM orders
    WHERE orders.user_id ='${user_id}'`);
};

const selectOrderItems = (order_id) => {
  return Pool.query(`SELECT order_items.*,
      products.product_id,
      products.product_name,
      products.product_stock,
      products.product_thumbnail,
      order_items.picked_variant
    FROM order_items
    LEFT JOIN products ON order_items.product_id = products.product_id
    WHERE order_items.order_id ='${order_id}'`);
};

const insertOrder = (data) => {
  const {
    order_id,
    order_status,
    total_price,
    payment_method,
    delivery_status,
    user_id,
  } = data;

  return Pool.query(
    `INSERT INTO orders(order_id, order_status, total_price, payment_method, delivery_status, user_id )
     VALUES($1, $2, $3, $4, $5, $6)`,
    [
      order_id,
      order_status,
      total_price,
      payment_method,
      delivery_status,
      user_id,
    ]
  );
};

const insertItem = (data) => {
  const {
    order_item_id,
    order_id,
    product_id,
    quantity,
    product_price,
    picked_variant,
  } = data;

  return Pool.query(
    `INSERT INTO order_items (order_item_id, order_id, product_id, quantity, product_price, picked_variant) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      order_item_id,
      order_id,
      product_id,
      quantity,
      product_price,
      picked_variant,
    ]
  );
};

const updateOrder = (data) => {
  const { order_id, order_status, delivery_status } = data;
  return Pool.query(
    `UPDATE orders
    SET order_status = COALESCE($1, order_status), 
      delivery_status = COALESCE($2, delivery_status)
    WHERE order_id = $3
    RETURNING *`,
    [order_status, delivery_status, order_id]
  );
};

const deleteOrder = (order_id) => {
  return Pool.query(`DELETE FROM orders WHERE order_id='${order_id}'`);
};

const findId = (order_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT order_id FROM orders WHERE order_id='${order_id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  selectOrders,
  selectOrderItems,
  insertOrder,
  insertItem,
  updateOrder,
  deleteOrder,
  findId,
};
