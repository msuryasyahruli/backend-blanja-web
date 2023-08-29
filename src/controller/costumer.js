const {
  createCustomer,
  updateCustomer,
  selectsCustomer,
  findEmail,
  findId,
} = require("../model/customer");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

const customerController = {
  registerCustomer: async (req, res) => {
    try {
      const { customer_fullname, customer_email, customer_password } = req.body;
      const { rowCount } = await findEmail(customer_email);
      if (rowCount) {
        return res.json({ messege: "Email is already taken" });
      }
      const customer_passwordHash = bcrypt.hashSync(customer_password);
      const customer_id = uuidv4();
      const data = {
        customer_id,
        customer_email,
        customer_passwordHash,
        customer_fullname,
        role: "customer",
      };
      createCustomer(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 201, "Customer created");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },

  loginCustomer: async (req, res) => {
    try {
      const { customer_email, customer_password } = req.body;
      const {
        rows: [customer],
      } = await findEmail(customer_email);
      if (!customer) {
        return res.json({ messege: "Email is incorrect" });
      }
      const validPassword = bcrypt.compareSync(
        customer_password,
        customer.customer_password
      );
      if (!validPassword) {
        return res.json({ messege: "password is incorrect" });
      }
      delete customer.customer_password;
      const payload = {
        customer_email: customer.customer_email,
        role: customer.role,
      };
      customer.token = authHelper.generateToken(payload);
      customer.refreshToken = authHelper.refreshToken(payload);
      commonHelper.response(res, customer, 201, "Token created");
    } catch (err) {
      console.log(err);
    }
  },

  profile: async (req, res) => {
    const customer_email = req.payload.customer_email;
    const {
      rows: [customer],
    } = await findEmail(customer_email);
    delete customer.customer_password;
    commonHelper.response(res, customer, 201);
  },

  refreshToken: (req, res) => {
    const RefreshToken = req.body.refreshToken;
    const decoded = jwt.verify(RefreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      customer_email: decoded.customer_email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 200, "Token has refreshed");
  },

  getDetailsCustomer: async (req, res) => {
    const customer_id = String(req.params.id);
    selectsCustomer(customer_id)
      .then((result) => {
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },

  updateCustomer: async (req, res) => {
    try {
      const customer_id = String(req.params.id);
      // const result = await cloudinary.uploader.upload(req.file.path);
      // const photo = result.secure_url;
      const {
        customer_email,
        customer_fullname,
        customer_address,
        customer_phone,
      } = req.body;
      const { rowCount } = await findId(customer_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        customer_id,
        customer_email,
        customer_fullname,
        customer_address,
        customer_phone,
      };
      updateCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Account updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = customerController;
