import { fakeCategory } from "../../helper/product.js";
import { Product } from "../models/Product.model.js";
import { Store } from "../models/Store.model.js";

export const SetStoreStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
    const isOnline = store.status;
    if (isOnline) {
      const setStore = await Store.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );
      return defautlResponse({ response: setStore, res });
    } else {
      const setStore = await Store.findByIdAndUpdate(
        id,
        { status: true },
        { new: true }
      );
      return defautlResponse({ response: setStore, res });
    }
  } catch (err) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const SetProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { isHidden } = req.body;
    const product = await Product.findById(id);
    const isInStock = product.inStock;
    if (isInStock) {
      const setStock = await Product.findByIdAndUpdate(
        id,
        {
          inStock: false,
          isHidden: false,
        },
        { new: true }
      );
      return defautlResponse({ response: setStock, res });
    } else {
      const setStock = await Product.findByIdAndUpdate(
        id,
        {
          inStock: true,
          isHidden,
        },
        { new: true }
      );
      return defautlResponse({ response: setStock, res });
    }
  } catch (err) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const getStoreCategory = (req, res) => {
  try {
    return defautlResponse({ response: fakeCategory, res });
  } catch (error) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const setStoreDeliveryCharges = async (req, res) => {
  try {
    const { id } = req.params;
    const { devileryCharges } = req.body;
    const store = await Store.findByIdAndUpdate(
      id,
      { devileryCharges },
      { new: true }
    );
    return defautlResponse({ response: store, res });
  } catch (error) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};
