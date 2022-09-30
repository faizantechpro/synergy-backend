import { fakeProducts } from "../../helper/product.js";
import { defautlResponse, errorResponse } from "../../helper/utils.js";
import { AppConfig } from "../models/AppConfig.model.js";
import { Product } from "../models/Product.model.js";
import { StoreNestedCategoryMenu } from "../models/StoreNestedCategoryMenu.model.js";
import { RecentlyViewedProduct } from "../models/RecentlyViewedProduct.model.js";
import { Wishlist } from "../models/Wishlist.model.js";
import {
  addRemoveFavouriteProductService,
  isFavouriteProductService,
} from "../services/FavouriteProduct.service.js";

export const addProduct = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;

    const { size, color } = req.body;
    const variants = {
      size,
      color,
    };

    const product = await Product.create({
      store: id,
      variants,
      ...req.body,
    });

    await AppConfig.findOneAndUpdate(
      { user: me._id },
      { isProductCreated: true },
      { new: true, upsert: true }
    );

    return defautlResponse({ response: product, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, size } = req.body;

    const variants = {
      size,
      color,
    };

    let product = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        variants,
      },
      { new: true }
    );

    // product = await isFavouriteProductService(me._id, product);

    return defautlResponse({ response: product, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    return defautlResponse({ response: product, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    let product = await Product.find({ _id: id });
    product = await isFavouriteProductService(me._id, product);
    let recentlyViewed = await RecentlyViewedProduct.findOne({
      userId: me._id,
    });
    if (recentlyViewed?.productId.length >= 8) {
      recentlyViewed = await RecentlyViewedProduct.findOneAndUpdate(
        { userId: me._id },
        {
          $push: { productId: product[0]._id },
          // $pop: { productId: -1 },
        },
        { new: true, upsert: true }
      );
      recentlyViewed = await RecentlyViewedProduct.findOneAndUpdate(
        { userId: me._id },
        {
          $pop: { productId: -1 },
        },
        { new: true, upsert: true }
      ).populate("productId");
    } else {
      recentlyViewed = await RecentlyViewedProduct.findOneAndUpdate(
        { userId: me._id },
        { $push: { productId: product[0]._id } },
        { new: true, upsert: true }
      ).populate("productId");
    }
    const similarProducts = await Product.find({}).limit(8);
    const sortedRecentlyViewed = recentlyViewed.productId.reverse();
    const RecentlyViewed = await isFavouriteProductService(
      me._id,
      sortedRecentlyViewed
    );
    const SimilarProducts = await isFavouriteProductService(
      me._id,
      similarProducts
    );

    const obj = [
      ...product,
      {
        type: "card",
        title: "Shop From Recently Viewed",
        products: RecentlyViewed,
      },
      {
        type: "card",
        title: "Similar Products",
        products: SimilarProducts,
      },
    ];
    return defautlResponse({ response: obj, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const getAllProductsByStoreId = async (req, res) => {
  try {
    // const { id } = req.params;
    // let products = await Product.find({ store: id });

    // products = await isFavouriteProductService(me._id, products);

    return defautlResponse({ res, response: fakeProducts });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });

  }
};

export const getAllProducts = async (req, res) => {
  try {
    const me = req.user;
    let products = await Product.find().populate("productCategory");

    products = await isFavouriteProductService(me._id, products);

    return defautlResponse({ response: products, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const getAllAndFilteredProducts = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    let products;
    if (id !== "all") {
      products = await Product.find({ categoryChild1: id }).populate(
        "productCategory"
      );
    } else {
      products = await Product.find().populate("productCategory");
    }

    products = await isFavouriteProductService(me._id, products);
    return defautlResponse({ response: products, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const getProductsFilterList = async (req, res) => {
  try {
    const me = req.user;
    const category = await StoreNestedCategoryMenu.findOne();

    let menu = category.menu.map((menu) => ({
      _id: menu._id,
      name: menu.name,
    }));
    return defautlResponse({ response: menu, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const addRemoveWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const me = req.user;
    const isFavoriteProduct = await addRemoveFavouriteProductService(
      me._id,
      id
    );
    if (isFavoriteProduct) {
      return res.status(200).json({ message: "Product is added to whishlist" });
    } else {
      return res
        .status(200)
        .json({ message: "Product is remove from whishlist" });
    }
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const me = req.user;
    const wishlist = await Wishlist.findOne({ userId: me._id }).populate(
      "productId"
    );
    if (wishlist.productId.length !== 0) {
      const products = await isFavouriteProductService(
        me._id,
        wishlist.productId
      );
      return defautlResponse({ res, response: { wishlist: products } });
    } else {
      return defautlResponse({
        res,
        response: { wishlist: [] },
        message: "wishlist is empty",
      });
    }
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};
