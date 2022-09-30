import { Wishlist } from "../models/Wishlist.model.js";

export const addRemoveFavouriteProductService = async (userId, postId) => {
  const FavouriteProduct = await Wishlist.findOne({ userId });
  const favourite = FavouriteProduct?.productId.find(
    (item) => String(item) === String(postId)
  );
  if (favourite) {
    await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { productId: postId } },
      { new: true, upsert: true }
    ).exec();
    return false;
  } else {
    await Wishlist.findOneAndUpdate(
      { userId },
      { $push: { productId: postId } },
      { new: true, upsert: true }
    ).exec();
    return true;
  }
};

export const getAllFavouriteProductService = async (userId) => {
  const favourite = await Wishlist.findOne({ userId });
  return favourite?.productId;
};

export const isFavouriteProductService = async (userId, products) => {
  const favourite = await Wishlist.findOne({ userId });
  const favouriteProducts = products.map((product) => {
    // console.log("post is", product);
    product.isFavourite = favourite?.productId
      ? favourite?.productId?.includes(product._id)
      : false;
    return product;
  });
  return favouriteProducts;
};
