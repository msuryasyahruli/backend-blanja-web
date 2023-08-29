const {
  selectAllProduct,
  selectProduct,
  selectProducSeller,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
  findSellerId,
  searching,
} = require("../model/products");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");
// const client = require("../config/redis");

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "product_created";
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
    const product_id = String(req.params.id);
    const { rowCount } = await findId(product_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectProduct(product_id)
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

  getSellerProduct: async (req, res) => {
    const seller_id = String(req.params.id);
    // const { rowCount } = await findSellerId(seller_id);
    // if (!rowCount) {
    //   return res.json({ message: "ID Not Found" });
    // }
    selectProducSeller(seller_id)
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

  createProduct: async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const product_photo = result.secure_url;
    const { product_name, product_price, product_stock, product_description, category_id, seller_id } = req.body;
    const product_id = uuidv4();
    const data = {
      product_id,
      product_name,
      product_price,
      product_stock,
      product_photo,
      product_description,
      category_id,
      seller_id,
    };
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },

  updateProduct: async (req, res) => {
    try {
      const product_id = String(req.params.id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const product_photo = result.secure_url;
      const { product_name, product_price, product_stock, product_description, category_id } = req.body;
      const { rowCount } = await findId(product_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        product_id,
        product_name,
        product_price,
        product_stock,
        product_photo,
        product_description,
        category_id,
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
      const product_id = String(req.params.id);
      const { rowCount } = await findId(product_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteProduct(product_id)
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
