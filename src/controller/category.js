const {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId,
  searching,
} = require("../model/category");
const commonHelper = require("../helper/common");

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllCategory(limit, offset, sortby, sort);
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
  getDetailCategory: async (req, res) => {
    const id = Number(req.params.id);
    selectCategory(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },
  createCategory: async (req, res) => {
    const { name } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const data = {
      id,
      name,
    };
    insertCategory(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Category created")
      )
      .catch((err) => res.send(err));
  },
  updateCategory: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id,
        name,
      };
      updateCategory(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Category updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteCategory(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Category deleted")
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

module.exports = categoryController;
