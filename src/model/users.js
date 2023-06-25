const Pool = require("../config/db");

const createUser = (data) => {
  const { id, email, passwordHash, fullname, role } = data;
  return Pool.query(`INSERT INTO users(id,email,password,fullname,role) VALUES('${id}','${email}','${passwordHash}','${fullname}','${role}')`);
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  createUser,
  findEmail,
};
