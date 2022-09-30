import { Comments } from '../models/Comments.model.js';

export const LikeUnLikeCommentsService = async (id, userId) => {
  const likeComment = await Comments.findById(id);
  const likedComment = likeComment.likedBy.find((item) => String(item) === String(userId));
  if (likedComment) {
    await Comments.findOneAndUpdate({ _id: id }, { $pull: { likedBy: userId } }, { new: true }).exec();
    return false;
  } else {
    await Comments.findOneAndUpdate({ _id: id }, { $push: { likedBy: userId } }, { new: true }).exec();
    return true;
  }
};
