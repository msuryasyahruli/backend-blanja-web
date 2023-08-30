const {
  selectAllOrders,
  selectOrders,
  insertOrders,
  deleteOrders,
  findId,
} = require("../model/orders");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const sortby = req.query.sortby || "order_id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllOrders(sortby, sort);
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },

  getDetailOrders: async (req, res) => {
    const customer_id = String(req.params.id);
    selectOrders(customer_id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  createOrders: async (req, res) => {
    const {
      product_id,
      customer_id,
    } = req.body;
    const order_id = uuidv4();
    const data = {
      order_id,
      product_id,
      customer_id,
    };
    insertOrders(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Orders created")
      )
      .catch((err) => res.send(err));
  },

  deleteOrders: async (req, res) => {
    try {
      const customer_id = String(req.params.id);
      // const { rowCount } = await findId(customer_id);
      // if (!rowCount) {
      //   res.json({ message: "ID is Not Found" });
      // }
      deleteOrders(customer_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Orders deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

};

module.exports = ordersController;
