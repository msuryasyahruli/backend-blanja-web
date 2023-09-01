const Pool = require("../config/db");

const selectAddress = (customer_id) => {
  return Pool.query(`SELECT * FROM address WHERE customer_id='${customer_id}'`);
};

const insertAddress = (data) => {
  const {
    address_id,
    address_name,
    posttal_code,
    city,
    save_address_as,
    customer_id,
  } = data;
  return Pool.query(
    `INSERT INTO address(address_id,address_name,posttal_code,city,save_address_as,customer_id) VALUES('${address_id}','${address_name}','${posttal_code}','${city}','${save_address_as}','${customer_id}')`
  );
};

const updateAddress = (data) => {
  const {
    address_id,
    address_name,
    posttal_code,
    city,
    save_address_as,
    customer_id,
  } = data;
  return Pool.query(
    `UPDATE address SET address_name='${address_name}',posttal_code='${posttal_code}',city='${city}',save_address_as='${save_address_as}',customer_id='${customer_id}' WHERE address_id='${address_id}'`
  );
};

const deleteAddress = (address_id) => {
  return Pool.query(`DELETE FROM address WHERE address_id='${address_id}'`);
};

module.exports = { selectAddress, insertAddress, updateAddress, deleteAddress };
