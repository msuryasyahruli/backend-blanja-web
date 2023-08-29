const Pool = require("../config/db");

const selectAllProduct = (limit, offset, sortby, sort) => {
  return Pool.query(
    `SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectProduct = (product_id) => {
  return Pool.query(`SELECT * FROM products WHERE product_id='${product_id}'`);
};

const selectProducSeller = (seller_id) => {
  return Pool.query(`SELECT * FROM products WHERE seller_id='${seller_id}'`);
};

const insertProduct = (data) => {
  const {
    product_id,
    product_name,
    product_price,
    product_stock,
    product_photo,
    product_description,
    category_id,
    seller_id,
  } = data;
  return Pool.query(
    `INSERT INTO products(product_id, product_name, product_price, product_stock, product_photo, product_description, category_id, seller_id) VALUES('${product_id}','${product_name}',${product_price},${product_stock},'${product_photo}','${product_description}','${category_id}','${seller_id}')`
  );
};

const updateProduct = (data) => {
  const {
    product_id,
    product_name,
    product_price,
    product_stock,
    product_photo,
    product_description,
    category_id,
  } = data;
  return Pool.query(
    `UPDATE products SET product_name='${product_name}', product_price=${product_price}, product_stock=${product_stock}, product_photo='${product_photo}', product_description='${product_description}', category_id='${category_id}' WHERE product_id='${product_id}'`
  );
};

const deleteProduct = (product_id) => {
  return Pool.query(`DELETE FROM products WHERE product_id='${product_id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM products");
};

const findId = (product_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT product_id FROM products WHERE product_id='${product_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findSellerId = (seller_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT seller_id FROM products WHERE seller_id='${seller_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const searching = (name) => {
  return Pool.query(
    `SELECT * FROM products WHERE products.product_name ILIKE '%${name}%'`
  );
};

module.exports = {
  selectAllProduct,
  selectProduct,
  selectProducSeller,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
  findSellerId,
  searching,
};
