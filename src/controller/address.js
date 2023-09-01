const { selectAddress, insertAddress, updateAddress, deleteAddress } = require("../model/address");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const addressController = {
  getAddress: async (req, res) => {
    const customer_id = String(req.params.id);
    selectAddress(customer_id)
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
  
  createAddress: async (req, res) => {
    const { address_name, posttal_code, city, save_address_as, customer_id } =
      req.body;
    const address_id = uuidv4();
    const data = {
      address_id,
      address_name,
      posttal_code,
      city,
      save_address_as,
      customer_id,
    };
    insertAddress(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Address created")
      )
      .catch((err) => res.send(err));
  },

  updateAddress: async (req, res) => {
    try {
      const address_id = String(req.params.id);
      const { address_name, posttal_code, city, save_address_as, customer_id } = req.body;
      const data = {
        address_id,
        address_name,
        posttal_code,
        city,
        save_address_as,
        customer_id,
      };
      updateAddress(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Account updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const address_id = String(req.params.id);
      deleteAddress(address_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = addressController;
