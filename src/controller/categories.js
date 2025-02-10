const {
  selectAllCategories,
  insertCategories,
  deleteCategories,
  findId,
  searching,
  findCategory,
} = require("../model/categories");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const categoriesController = {
  getAllCategory: async (req, res) => {
    try {
      const sortby = req.query.sortby || "category_name";
      const sort = req.query.sort || "ASC";

      const result = await selectAllCategories(sortby, sort);
      commonHelper.response(res, result.rows, 200, "Get data success");
    } catch (error) {
      console.error(error);
    }
  },

  createCategory: async (req, res) => {
    const { category_name } = req.body;
    const { rowCount } = await findCategory(category_name);
    if (rowCount) {
      return res.json({ messege: "Category is already taken" });
    }

    const category_id = uuidv4();
    const data = {
      category_id,
      category_name,
    };

    insertCategories(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Category created")
      )
      .catch((err) => res.send(err));
  },

  deleteCategory: async (req, res) => {
    try {
      const category_id = String(req.params.id);
      const { rowCount } = await findId(category_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }

      deleteCategories(category_id)
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
        commonHelper.response(res, result.rows, 200, "Search success");
      })
      .catch((err) => res.send(err));
  },
};

module.exports = categoriesController;
