const Pool = require("../config/db");

const selectAllProducts = (limit, offset, sortby, sort) => {
  return Pool.query(
    `SELECT products.product_id,
      products.product_name,
      products.product_price,
      products.product_stock,
      products.product_thumbnail,
      products.product_variants,
      stores.store_name,
      categories.category_name,
      products.created_at FROM products
    LEFT JOIN categories ON products.category_id = categories.category_id
    LEFT JOIN stores ON products.user_id = stores.user_id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectProduct = (product_id) => {
  return Pool.query(`SELECT products.*, stores.*, categories.* FROM products 
    LEFT JOIN categories ON products.category_id = categories.category_id
    LEFT JOIN stores ON products.user_id = stores.user_id
    WHERE products.product_id = '${product_id}'`);
};

const selectSellerProducts = (user_id) => {
  return Pool.query(`SELECT * FROM products WHERE user_id='${user_id}'`);
};

const insertProduct = (data) => {
  const {
    product_id,
    product_name,
    product_price,
    product_stock,
    product_thumbnail,
    product_description,
    product_variants,
    category_id,
    user_id,
  } = data;
  return Pool.query(
    `INSERT INTO products( product_id, product_name, product_price, product_stock, product_thumbnail, product_description, product_variants, category_id, user_id ) 
    VALUES('${product_id}','${product_name}',${product_price},${product_stock},'${product_thumbnail}','${product_description}','${product_variants}','${category_id}','${user_id}')`
  );
};

const updateProduct = (data) => {
  const {
    product_id,
    product_name,
    product_price,
    product_stock,
    product_thumbnail,
    product_description,
    product_variants,
    category_id,
  } = data;
  return Pool.query(
    `UPDATE products SET 
      product_name = COALESCE($1, product_name),
      product_price = COALESCE($2, product_price), 
      product_stock = COALESCE($3, product_stock),
      product_thumbnail = COALESCE($4, product_thumbnail),
      product_description = COALESCE($5, product_description),
      product_variants = COALESCE($6, product_variants),
      category_id = COALESCE($7, category_id)
    WHERE product_id = $8
    RETURNING *`,
    [
      product_name,
      product_price,
      product_stock,
      product_thumbnail,
      product_description,
      product_variants,
      category_id,
      product_id,
    ]
  );
};

const deleteProduct = (product_id) => {
  return Pool.query(`DELETE FROM products WHERE product_id='${product_id}'`);
};

const countData = (name) => {
  return Pool.query(`SELECT COUNT(*) FROM products WHERE products.product_name ILIKE '%${name}%'`);
};

const findId = (product_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT product_id FROM products WHERE product_id='${product_id}'`,
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

const findSellerId = (user_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT user_id FROM products WHERE user_id='${user_id}'`,
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

const searching = (name, limit, offset, sortby, sort) => {
  return Pool.query(
    `SELECT * FROM products WHERE products.product_name ILIKE '%${name}%'
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

module.exports = {
  selectAllProducts,
  selectProduct,
  selectSellerProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
  findSellerId,
  searching,
};
