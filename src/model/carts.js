const Pool = require("../config/db");

const selectCarts = (user_id, sortby, sort) => {
  return Pool.query(`SELECT 
      carts.cart_id,
      products.product_id,
      products.product_name,
      products.product_price,
      products.product_stock,
      products.product_thumbnail,
      products.product_variants,
      carts.quantity,
      categories.category_name,
      carts.created_at
    FROM carts
    LEFT JOIN products ON carts.product_id = products.product_id
    LEFT JOIN categories ON products.category_id = categories.category_id
    WHERE carts.user_id ='${user_id}'
    ORDER BY ${sortby} ${sort}`);
};

const insertCarts = (data) => {
  const { cart_id, product_id, user_id, quantity } = data;
  return Pool.query(
    `INSERT INTO carts(cart_id, product_id, user_id, quantity ) 
    VALUES('${cart_id}','${product_id}','${user_id}','${quantity}')`
  );
};

const updateCart = (data) => {
  const { cart_id, quantity } = data;
  return Pool.query(
    `UPDATE carts SET quantity = '${quantity}' WHERE cart_id = '${cart_id}'
    `
  );
};

const deleteCarts = (cart_id) => {
  return Pool.query(`DELETE FROM carts WHERE cart_id='${cart_id}'`);
};

const deleteByUser = (user_id) => {
  return Pool.query(`DELETE FROM carts WHERE user_id='${user_id}'`);
};

const findId = (cart_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT cart_id FROM carts WHERE cart_id='${cart_id}'`,
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

const findProduct = (product_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM carts WHERE product_id='${product_id}'`,
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
  selectCarts,
  insertCarts,
  updateCart,
  deleteCarts,
  deleteByUser,
  findId,
  findProduct,
};
