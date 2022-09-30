import { Favourite } from '../models/Favourite.model.js';

export const AddFavouriteRemoveFavouritePostService = async (userId, postId) => {
  const FavouritePosts = await Favourite.findOne({ userId });
  const favourite = FavouritePosts.postId.find((item) => String(item) === String(postId));
  if (favourite) {
    await Favourite.findOneAndUpdate({ userId }, { $pull: { postId } }, { new: true }).exec();
    return false;
  } else {
    await Favourite.findOneAndUpdate({ userId }, { $push: { postId } }, { new: true }).exec();
    return true;
  }
};
