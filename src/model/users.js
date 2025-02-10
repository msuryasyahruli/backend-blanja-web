const Pool = require("../config/db");

const createUser = (data) => {
  const { user_id, username, user_email, password_hash, phone_number, role } =
    data;
  return Pool.query(
    `INSERT INTO users( user_id, username, user_email, user_password, phone_number, role ) 
      VALUES('${user_id}','${username}','${user_email}','${password_hash}','${phone_number}','${role}')`
  );
};

const createStore = (data) => {
  const { store_name, user_id } = data;
  return Pool.query(
    `INSERT INTO stores( store_name, user_id ) 
      VALUES('${store_name}','${user_id}')`
  );
};

const updateUser = (data) => {
  const { user_id, username, user_email, user_photo, phone_number } = data;
  return Pool.query(
    `UPDATE users 
      SET username = COALESCE($1, username), 
        user_email = COALESCE($2, user_email), 
        user_photo = COALESCE($3, user_photo), 
        phone_number = COALESCE($4, phone_number) 
      WHERE user_id = $5 
      RETURNING *`,
    [username, user_email, user_photo, phone_number, user_id]
  );
};

const updateStore = (data) => {
  const { user_id, store_name, store_description } = data;
  return Pool.query(
    `UPDATE stores
    SET store_name = COALESCE($1, store_name), 
      store_description = COALESCE($2, store_description)
    WHERE user_id = $3
    RETURNING *`,
    [store_name, store_description, user_id]
  );
};

const deletePicture = (user_id) => {
  return Pool.query(
    `UPDATE users SET user_photo = NULL WHERE user_id ='${user_id}'`
  );
};

const findEmail = (user_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE user_email='${user_email}'`,
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

const findId = (user_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT user_id, role FROM users WHERE user_id='${user_id}'`,
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
  createUser,
  createStore,
  updateUser,
  updateStore,
  deletePicture,
  findEmail,
  findId,
};
