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

module.exports = {
  createSeller,
  findEmail,
  selectsSeller,
};
