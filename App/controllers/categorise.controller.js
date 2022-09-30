import { Categories } from "../models/Category.model.js";

export const allCategorire = async (req, res) => {
  try {
    const categorise = await Categories.find();
    return res.status(200).json(categorise);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
