const Pool = require("../config/db");

const createSeller = (data) => {
  const {
    seller_id,
    seller_email,
    seller_passwordHash,
    seller_fullname,
    role,
    seller_phone,
    store_name,
    store_description,
  } = data;
  return Pool.query(
    `INSERT INTO seller(seller_id, seller_email, seller_password, seller_fullname, role, seller_phone, store_name, store_description) VALUES('${seller_id}','${seller_email}','${seller_passwordHash}','${seller_fullname}','${role}','${seller_phone}','${store_name}','${store_description}')`
  );
};

const updateSeller = (data) => {
  const {
    seller_id,
    seller_email,
    seller_fullname,
    seller_phone,
    store_name,
    store_description,
  } = data;
  return Pool.query(
    `UPDATE seller SET seller_email='${seller_email}', seller_fullname='${seller_fullname}',seller_phone='${seller_phone}', store_name='${store_name}', store_description='${store_description}' WHERE seller_id='${seller_id}'`
  );
};

const selectsSeller = (seller_id) => {
  return Pool.query(`SELECT * FROM seller WHERE seller_id='${seller_id}'`);
};

const findEmail = (seller_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM seller WHERE seller_email='${seller_email}'`,
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

const findId = (seller_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT seller_id FROM seller WHERE seller_id='${seller_id}'`,
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
  createSeller,
  findEmail,
  selectsSeller,
  updateSeller,
  findId,
};
