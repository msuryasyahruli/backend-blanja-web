const Pool = require("../config/db");

const selectAddress = (user_id) => {
  return Pool.query(`SELECT * FROM address WHERE user_id='${user_id}' ORDER BY is_default DESC`);
};

const insertAddress = (data) => {
  const {
    address_id,
    address_name,
    postal_code,
    city,
    address_type,
    is_default,
    user_id,
  } = data;
  return Pool.query(
    `INSERT INTO address( address_id, address_name, postal_code, city, address_type, is_default, user_id ) 
    VALUES('${address_id}','${address_name}','${postal_code}','${city}','${address_type}','${is_default}','${user_id}')`
  );
};

const updateAddress = (data) => {
  const {
    address_id,
    address_name,
    postal_code,
    city,
    address_type,
    is_default,
  } = data;
  return Pool.query(
    `UPDATE address 
    SET address_name = COALESCE($1, address_name), 
      postal_code = COALESCE($2, postal_code), 
      city = COALESCE($3, city),
      address_type = COALESCE($4, address_type),
      is_default = COALESCE($5, is_default)
    WHERE address_id = $6
    RETURNING *`,
    [
      address_name,
      postal_code,
      city,
      address_type,
      is_default,
      address_id,
    ]
  );
};

const deleteAddress = (address_id) => {
  return Pool.query(`DELETE FROM address WHERE address_id='${address_id}'`);
};

const findId = (address_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM address WHERE address_id='${address_id}'`,
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
  selectAddress,
  insertAddress,
  updateAddress,
  deleteAddress,
  findId,
};
