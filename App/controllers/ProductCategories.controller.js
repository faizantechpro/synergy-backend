import { Product } from "../models/Product.model.js";
import { ProductCategories } from "../models/ProductCategory.model.js";

export const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategories.find();
    return res.status(200).json(productCategories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getAllProductByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategories = await Product.find({
      productCategory: id,
    });
    return res.status(200).json(productCategories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
