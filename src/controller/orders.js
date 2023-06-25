const {
  selectAllOrders,
  selectOrders,
  insertOrders,
  updateOrders,
  deleteOrders,
  countData,
  findId,
  searching,
} = require("../model/orders");
const commonHelper = require("../helper/common");

const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllOrders(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },
  getDetailOrders: async (req, res) => {
    const id = Number(req.params.id);
    selectOrders(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },
  createOrders: async (req, res) => {
    const { date, address, shipping, total_price, id_product } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const data = {
      id,
      date,
      address,
      shipping,
      total_price,
      id_product,
    };
    insertOrders(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Orders created")
      )
      .catch((err) => res.send(err));
  },
  updateOrders: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { date, address, shipping, total_price, id_product } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id,
        date,
        address,
        shipping,
        total_price,
        id_product,
      };
      updateOrders(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Orders updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteOrders: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteOrders(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Orders deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  searching: async (req, res) => {
    const search = req.query.keyword;
    searching(search)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "search success");
      })
      .catch((err) => res.send(err));
  },
};

module.exports = ordersController;
