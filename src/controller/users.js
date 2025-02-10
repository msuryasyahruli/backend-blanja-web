const {
  createUser,
  findEmail,
  updateUser,
  findId,
  deletePicture,
  createStore,
  updateStore,
} = require("../model/users");
const bcrypt = require("bcryptjs");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const authHelper = require("../helper/auth");
const jwt = require("jsonwebtoken");
const cloudinary = require("../middleware/cloudinary");

const usersController = {
  register: async (req, res) => {
    try {
      const {
        username,
        user_email,
        user_password,
        role,
        store_name,
        phone_number,
      } = req.body;

      if (role !== "seller" && role !== "customer") {
        return res.json({
          messege: "The role can only be as a seller or customer only",
        });
      }

      const { rowCount } = await findEmail(user_email);
      if (rowCount) {
        return res.json({ messege: "Email is already taken" });
      }

      if (role === "seller" && (!store_name || !phone_number)) {
        return res.json({
          messege: "Store name and phone number are required for sellers",
        });
      }

      const password_hash = bcrypt.hashSync(user_password);
      const user_id = uuidv4();

      const data = {
        user_id,
        username,
        user_email,
        password_hash,
        role,
        store_name: role === "seller" ? store_name : null,
        phone_number: role === "seller" ? phone_number : null,
      };

      const result = await createUser(data);

      if (role === "seller") {
        const storeData = {
          user_id,
          store_name,
        };

        await createStore(storeData);
      }
      commonHelper.response(res, result.rows, 201, "Register success");
    } catch (err) {
      console.error(err);
    }
  },

  login: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
      const {
        rows: [user],
      } = await findEmail(user_email);
      if (!user) {
        return res.json({ messege: "Email is incorrect" });
      }

      const validPassword = bcrypt.compareSync(
        user_password,
        user.user_password
      );
      if (!validPassword) {
        return res.json({ messege: "password is incorrect" });
      }

      delete user.user_id;
      delete user.user_password;
      const payload = {
        user_email: user.user_email,
        role: user.role,
      };

      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.refreshToken(payload);
      commonHelper.response(res, user, 201, "Login success");
    } catch (err) {
      console.error(err);
    }
  },

  profile: async (req, res) => {
    const user_email = req.payload.user_email;
    const {
      rows: [users],
    } = await findEmail(user_email);

    delete users.user_password;
    commonHelper.response(res, users, 200);
  },

  updateProfile: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const { username, user_email, phone_number } = req.body;
      const { rowCount } = await findId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      let user_photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "Profile Users",
          public_id: user_id,
        });
        user_photo = result.secure_url;
      }

      const data = {
        user_id,
        username,
        user_email,
        user_photo,
        phone_number,
      };

      const result = await updateUser(data);
      delete result.rows[0].user_password;
      commonHelper.response(res, result.rows[0], 200, "Update profile success");
    } catch (err) {
      console.error(err);
    }
  },

  updateStore: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const { store_name, store_description } = req.body;
      const {
        rowCount,
        rows: [users],
      } = await findId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      if (users.role !== "seller") {
        return res.json({ message: "Only sellers can edit stores" });
      }

      const data = {
        user_id,
        store_name,
        store_description,
      };

      const result = await updateStore(data);
      commonHelper.response(res, result.rows[0], 200, "Update store success");
    } catch (err) {
      console.error(err);
    }
  },

  deletePicture: async (req, res) => {
    const user_id = String(req.params.id);
    await cloudinary.uploader.destroy("Profile Users/" + user_id, (error) => {
      if (error) {
        return commonHelper.failed(res, 400, "Error deleting file from Cloud");
      }
    });

    await deletePicture(user_id);
    commonHelper.response(res, [], 200, "Profile picture deleted");
  },

  refreshToken: (req, res) => {
    const RefreshToken = req.body.refreshToken;
    const decoded = jwt.verify(RefreshToken, process.env.SECRETE_KEY_JWT);

    const payload = {
      user_email: decoded.user_email,
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
