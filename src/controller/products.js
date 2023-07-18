const {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
  searching,
} = require("../model/products");
const commonHelper = require("../helper/common");
// const client = require("../config/redis");
const cloudinary = require("../middleware/cloudinary");

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllProduct(limit, offset, sortby, sort);
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
  getDetailProduct: async (req, res) => {
    const id = Number(req.params.id);
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectProduct(id)
      .then((result) => {
        // client.setEx(`products/${id}`, 60 * 60, JSON.stringify(result.rows));
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },
  createProduct: async (req, res) => {
    const PORT = process.env.PORT || 2525;
    const DB_HOST = process.env.PGHOST || "localhost";
    const result = await cloudinary.uploader.upload(req.file.path);
    const photo = result.secure_url;
    const { name, price, stock, description, id_category } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const data = {
      id,
      name,
      price,
      stock,
      photo,
      description,
      id_category,
    };
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res) => {
    try {
      const PORT = process.env.PORT || 2525;
      const DB_HOST = process.env.PGHOST || "localhost";
      const id = Number(req.params.id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const photo = result.secure_url;
      const { name, price, stock, description, id_category } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id,
        name,
        price,
        stock,
        photo,
        description,
        id_category,
      };
      updateProduct(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteProduct(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
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

module.exports = productController;
