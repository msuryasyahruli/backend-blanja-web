const Pool = require("../config/db");

const selectAllCategories = (sortby, sort) => {
  return Pool.query(`SELECT * FROM categories ORDER BY ${sortby} ${sort}`);
};

const insertCategories = (data) => {
  const { category_id, category_name } = data;
  return Pool.query(
    `INSERT INTO categories( category_id, category_name ) VALUES('${category_id}','${category_name}')`
  );
};

const deleteCategories = (category_id) => {
  return Pool.query(
    `DELETE FROM categories WHERE category_id='${category_id}'`
  );
};

const searching = (category_name) => {
  return Pool.query(
    `SELECT * FROM categories WHERE categories.category_name ILIKE '%${category_name}%'`
  );
};

const findId = (category_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT category_id FROM categories WHERE category_id='${category_id}'`,
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

const findCategory = (category_name) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT category_name FROM categories WHERE category_name='${category_name}'`,
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
  selectAllCategories,
  insertCategories,
  deleteCategories,
  searching,
  findId,
  findCategory,
};
