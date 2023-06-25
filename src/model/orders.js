const Pool = require("../config/db");

const selectAllOrders = (limit, offset, sortby, sort) => {
  return Pool.query(
    `SELECT * FROM orders ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectOrders = (id) => {
  return Pool.query(`SELECT * FROM orders WHERE id=${id}`);
};

const insertOrders = (data) => {
  const { id, date, address, shipping, total_price, id_product } = data;
  return Pool.query(
    `INSERT INTO orders(id, date, address, shipping, total_price, id_product) VALUES(${id},'${date}','${address}','${shipping}',${total_price},${id_product})`
  );
};

const updateOrders = (data) => {
  const { id, date, address, shipping, total_price, id_product } = data;
  return Pool.query(
    `UPDATE orders SET date='${date}', address='${address}', shipping='${shipping}', total_price=${total_price}, id_product=${id_product} WHERE id=${id}`
  );
};

const deleteOrders = (id) => {
  return Pool.query(`DELETE FROM orders WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM orders");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM orders WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const searching = (date) => {
  return Pool.query(`SELECT * FROM orders WHERE orders.date ILIKE '%${date}%'`);
};

module.exports = {
  selectAllOrders,
  selectOrders,
  insertOrders,
  updateOrders,
  deleteOrders,
  countData,
  findId,
  searching,
};
