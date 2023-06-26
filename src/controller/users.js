const { createUser, findEmail } = require("../model/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

const usersController = {
  registerUser: async (req, res) => {
    try {
      const { fullname, email, password, role } = req.body;
      const { rowCount } = await findEmail(email);
      if (rowCount) {
        return res.json({ messege: "Email is already taken" });
      }
      const passwordHash = bcrypt.hashSync(password);
      const id = uuidv4();
      const data = {
        id,
        email,
        passwordHash,
        fullname,
        role,
      };
      createUser(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 201, "User created");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return res.json({ messege: "Email is incorrect" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.json({ messege: "password is incorrect" });
      }
      delete user.password;
      const payload = {
        email: user.email,
        role: user.role,
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.refreshToken(payload);
      commonHelper.response(res, user, 201, "Token created");
    } catch (err) {
      console.log(err);
    }
  },
  profile: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 201);
  },
  refreshToken: (req, res) => {
    const RefreshToken = req.body.refreshToken;
    const decoded = jwt.verify(RefreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 200, "Token has refreshed");
  },
};

module.exports = usersController;
