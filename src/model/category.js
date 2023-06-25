const Pool = require("../config/db");

const selectAllCategory = (limit, offset, sortby, sort) => {
  return Pool.query(
    `SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectCategory = (id) => {
  return Pool.query(`SELECT * FROM category WHERE id=${id}`);
};

const insertCategory = (data) => {
  const { id, name } = data;
  return Pool.query(`INSERT INTO category(id,name) VALUES(${id},'${name}')`);
};

const updateCategory = (data) => {
  const { id, name } = data;
  return Pool.query(`UPDATE category SET name='${name}' WHERE id=${id}`);
};

const deleteCategory = (id) => {
  return Pool.query(`DELETE FROM category WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM category");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM category WHERE id=${id}`, (error, result) => {
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
    `SELECT * FROM category WHERE category.name ILIKE '%${name}%'`
  );
};

module.exports = {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId,
  searching,
};
