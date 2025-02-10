const {
  selectAllProducts,
  selectProduct,
  selectSellerProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId: productId,
  searching,
} = require("../model/products");
const { findId: userId } = require("../model/users");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");
// const client = require("../config/redis");

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "created_at";
      const sort = req.query.sort || "DESC";

      const result = await selectAllProducts(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countData('');

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
        "Get data success",
        pagination
      );
    } catch (error) {
      console.error(error);
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const product_id = String(req.params.id);
      const { rowCount } = await productId(product_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      const result = await selectProduct(product_id);
      delete result.rows[0].user_id;
      delete result.rows[0].category_id;
      commonHelper.response(res, result.rows[0], 200, "Get data success");
    } catch (error) {
      console.error(error);
    }
  },

  getSellerProducts: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const { rowCount } = await userId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID user is Not Found" });
      }

      const result = await selectSellerProducts(user_id);
      commonHelper.response(res, result.rows, 200, "Get data success");
    } catch (error) {
      console.error(error);
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_name,
        product_price,
        product_stock,
        product_description,
        product_variants,
        category_id,
        user_id,
      } = req.body;

      const { rowCount } = await userId(user_id);
      if (!rowCount) {
        return res.json({ message: "ID user is Not Found" });
      }

      const product_id = uuidv4();
      let product_thumbnail = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "Products Blanja",
          public_id: product_id,
        });
        product_thumbnail = result.secure_url;
      } else {
        return res.json({ message: "Thumbnail cannot be empty" });
      }

      const data = {
        product_id,
        product_name,
        product_price,
        product_stock,
        product_thumbnail,
        product_description,
        product_variants,
        category_id,
        user_id,
      };

      const result = await insertProduct(data);
      commonHelper.response(res, result.rows, 201, "Product created");
    } catch (error) {
      console.error(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product_id = String(req.params.id);
      const {
        product_name,
        product_price,
        product_stock,
        product_description,
        product_variants,
        category_id,
      } = req.body;

      const { rowCount } = await productId(product_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      let product_thumbnail = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "Products Blanja",
          public_id: product_id,
        });
        product_thumbnail = result.secure_url;
      }

      const data = {
        product_id,
        product_name,
        product_price,
        product_stock,
        product_thumbnail,
        product_description,
        product_variants,
        category_id,
      };

      await updateProduct(data);
      commonHelper.response(res, [], 200, "Product updated");
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product_id = String(req.params.id);
      const { rowCount } = await productId(product_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }

      await cloudinary.uploader.destroy(
        "Products Blanja/" + product_id,
        (error) => {
          if (error) {
            return res.json({ message: "Error deleting file from Cloud" });
          }
        }
      );

      await deleteProduct(product_id);
      commonHelper.response(res, [], 200, "Product deleted");
    } catch (error) {
      console.error(error);
    }
  },

  searching: async (req, res) => {
    try {
      const search = req.query.keyword;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "product_id";
      const sort = req.query.sort || "asc";

      if (!search) {
        return res.json({ message: "Keyword cannot be empty"})
      }

      const result = await searching(search, limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countData(search);

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
        "Search success",
        pagination
      );
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = productsController;
