const Pool = require("../config/db");

const selectAllCategory = ( sortby, sort) => {
  return Pool.query(
    `SELECT * FROM category ORDER BY ${sortby} ${sort}`
  );
};

const insertCategory = (data) => {
  const { category_id, category_name } = data;
  return Pool.query(`INSERT INTO category(category_id,category_name) VALUES('${category_id}','${category_name}')`);
};

const deleteCategory = (category_id) => {
  return Pool.query(`DELETE FROM category WHERE category_id='${category_id}'`);
};

const findId = (category_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT category_id FROM category WHERE category_id='${category_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const searching = (category_name) => {
  return Pool.query(
    `SELECT * FROM category WHERE category.category_name ILIKE '%${category_name}%'`
  );
};


const findName = (category_name) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM category WHERE category_name='${category_name}'`,
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
  selectAllCategory,
  insertCategory,
  deleteCategory,
  findId,
  searching,
  findName,
};
