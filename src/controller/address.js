const {
  selectAddress,
  insertAddress,
  updateAddress,
  deleteAddress,
  findId: addressId,
} = require("../model/address");
const { findId: userId } = require("../model/users");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const addressController = {
  getAddress: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const { rowCount } = await userId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      const result = await selectAddress(user_id);
      commonHelper.response(res, result.rows, 200, "Get data success");
    } catch (err) {
      console.error(err);
    }
  },

  createAddress: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const { rowCount } = await userId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      const { address_name, postal_code, city, address_type, is_default } =
        req.body;

      if (!address_name || !postal_code || !city || !address_type) {
        return res.json({ message: "This form cannot be empty" });
      }

      if (is_default) {
        const { rows: existingAddresses } = await selectAddress(user_id);

        for (const address of existingAddresses) {
          if (address.is_default && address.address_id !== address_id) {
            await updateAddress({ ...address, is_default: false });
          }
        }
      }

      const address_id = uuidv4();
      const data = {
        address_id,
        address_name,
        postal_code,
        city,
        address_type,
        is_default: is_default || false,
        user_id,
      };

      const result = await insertAddress(data);
      commonHelper.response(res, result.rows, 201, "Address created");
    } catch (err) {
      console.error(err);
    }
  },

  updateAddress: async (req, res) => {
    try {
      const address_id = String(req.params.id);
      const { rowCount, rows } = await addressId(address_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      const { address_name, postal_code, city, address_type, is_default } =
        req.body;

      const user_id = rows[0].user_id;

      if (is_default) {
        const { rows: existingAddresses } = await selectAddress(user_id);

        for (const address of existingAddresses) {
          if (address.is_default && address.address_id !== address_id) {
            await updateAddress({ ...address, is_default: false });
          }
        }
      }

      const data = {
        address_id,
        address_name,
        postal_code,
        city,
        address_type,
        is_default,
      };

      const result = await updateAddress(data);
      commonHelper.response(res, result.rows[0], 200, "Address updated");
    } catch (err) {
      console.error(err);
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const address_id = String(req.params.id);
      const { rowCount } = await addressId(address_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      const result = await deleteAddress(address_id);
      commonHelper.response(res, result.rows, 200, "Address deleted");
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = addressController;
