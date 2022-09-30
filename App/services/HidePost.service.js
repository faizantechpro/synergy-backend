import { HidePosts } from '../models/HidePost.model.js';

export const hideUnhidePostService = async (userId, postId) => {
  const HiddenPosts = await HidePosts.findOne({ userId });
  const hidden = HiddenPosts.hiddenPosts.find((item) => String(item) === String(postId));
  if (hidden) {
    await HidePosts.findOneAndUpdate({ userId }, { $pull: { hiddenPosts: postId } }, { new: true }).exec();
    return false;
  } else {
    await HidePosts.findOneAndUpdate({ userId }, { $push: { hiddenPosts: postId } }, { new: true }).exec();
    return true;
  }
};

export const getAllHiddenPostsService = async (userId) => {
    const user = await HidePosts.findOne({userId});
    return user?.hiddenPosts;
  }