const Pool = require("../config/db");

const selectAllOrders = (sortby, sort) => {
  return Pool.query(`SELECT * FROM orders ORDER BY ${sortby} ${sort}`);
};

const selectOrders = (customer_id) => {
  return Pool.query(`SELECT orders.*,products.* FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id ='${customer_id}'`);
};

const insertOrders = (data) => {
  const {
    order_id,
    product_id,
    customer_id,
  } = data;
  return Pool.query(
    `INSERT INTO orders(order_id, product_id, customer_id ) VALUES('${order_id}','${product_id}','${customer_id}')`
  );
};

const deleteOrders = (order_id) => {
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
  selectAllOrders,
  selectOrders,
  insertOrders,
  deleteOrders,
  findId,
};
