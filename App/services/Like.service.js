import { Like } from '../models/Like.model.js';

export const LikeUnLikePostService = async (postId, userId) => {
  const likePost = await Like.findOne({ postId });
  const likedPost = likePost.userId.find((item) => String(item) === String(userId));
  if (likedPost) {
    await Like.findOneAndUpdate({ postId }, { $pull: { userId } }, { new: true }).exec();
    return false;
  } else {
    await Like.findOneAndUpdate({ postId }, { $push: { userId } }, { new: true }).exec();
    return true;
  }
};
