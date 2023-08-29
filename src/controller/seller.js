const { createSeller, findEmail, selectsSeller } = require("../model/seller");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

const sellerController = {
  registerSeller: async (req, res) => {
    try {
      const {
        seller_fullname,
        seller_email,
        seller_password,
        seller_phone,
        store_name,
        store_description,
      } = req.body;
      const { rowCount } = await findEmail(seller_email);
      if (rowCount) {
        return res.json({ messege: "Email is already taken" });
      }
      const seller_passwordHash = bcrypt.hashSync(seller_password);
      const seller_id = uuidv4();
      const data = {
        seller_id,
        seller_email,
        seller_passwordHash,
        seller_fullname,
        role: "seller",
        seller_phone,
        store_name,
        store_description,
      };
      createSeller(data)
        .then((result) => {
          commonHelper.response(
            res,
            result.rows,
            201,
            "Seller Account Created"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },

  loginSeller: async (req, res) => {
    try {
      const { seller_email, seller_password } = req.body;
      const {
        rows: [seller],
      } = await findEmail(seller_email);
      if (!seller) {
        return res.json({ messege: "Email is incorrect" });
      }
      const validPassword = bcrypt.compareSync(
        seller_password,
        seller.seller_password
      );
      if (!validPassword) {
        return res.json({ messege: "password is incorrect" });
      }
      delete seller.seller_password;
      const payload = {
        seller_email: seller.seller_email,
        role: seller.role,
      };
      seller.token = authHelper.generateToken(payload);
      seller.refreshToken = authHelper.refreshToken(payload);
      commonHelper.response(res, seller, 201, "Token created");
    } catch (err) {
      console.log(err);
    }
  },

  profile: async (req, res) => {
    const seller_email = req.payload.seller_email;
    const {
      rows: [seller],
    } = await findEmail(seller_email);
    delete seller.seller_password;
    commonHelper.response(res, seller, 201);
  },

  refreshToken: (req, res) => {
    const RefreshToken = req.body.refreshToken;
    const decoded = jwt.verify(RefreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      seller_email: decoded.seller_email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 200, "Token has refreshed");
  },

  getDetailsSeller: async (req, res) => {
    const seller_id = String(req.params.id);
    selectsSeller(seller_id)
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
};

module.exports = sellerController;
