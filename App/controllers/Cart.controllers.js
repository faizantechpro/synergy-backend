import { Cart } from "../models/Cart.model.js";

export const AddToCart = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { userId: me._id },
      { $push: {products: { product: id } }},
      { new: true, upsert: true }
    ).populate(["address", "products.product"]);
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const RemoveFromCart = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { userId: me._id },
      { $pull: { products: id } },
      { new: true }
    ).populate(["address", "products.product"]);
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const IncreaseProductQuantity = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    const cart = await Cart.findOneAndUpdate(
      {
        userId: me._id,
        "products.product": id,
      },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    ).populate(["address", "products.product"]);
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const DecreaseProductQuantity = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    const cart = await Cart.findOneAndUpdate(
      {
        userId: me._id,
        "products.product": id,
      },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    ).populate(["address", "products.product"]);
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
