import { User } from '../models/User.model.js';

export const getUserByIdService = (id) => {
  return User.findById(id).populate([
    {
      path: 'profileImage',
    },
    {
      path: 'stats',
    },
  ]);
};

export const checkUserNameService = (userName) => {
  return User.findOne({ name: userName });
};

export const searchUsersService = (query) => {
  return User.find({ name: new RegExp(query, 'i') })
    .populate([
      {
        path: 'profileImage',
      },
      {
        path: 'stats',
      },
    ])
    .lean()
    .exec();
};

export const getAllUsersService = async () => {
  return await User.find()
    .populate([
      {
        path: 'profileImage',
      },
      {
        path: 'stats',
      },
    ])
    .lean()
    .exec();
};

export const deleteUserByIdService = (id) => {
  return User.findByIdAndRemove(id);
};

export const addFcmTokenService = async (fcm, userId) => {
  let user = await User.findById(userId);
  const fcmTokenExists = user.fcm.find((item) => item.deviceType === fcm.deviceType && item.token === fcm.token);
  if (!fcmTokenExists) {
    user = await User.findByIdAndUpdate(userId, { $push: { fcm } }, { new: true }).exec();
  }
  return user;
};

export const removeFcmTokenService = async (fcm, userId) => {
  let user = await User.findById(userId);
  const fcmTokenExists = user.fcm.find((item) => item.deviceType === fcm.deviceType && item.token === fcm.token);
  if (fcmTokenExists) {
    user = await User.findByIdAndUpdate(userId, { $pull: { fcm: { _id: fcmTokenExists._id } } }, { new: true }).exec();
  }
  return user;
};

export const favoritePostService = async (postId, userId) => {
  const userFavoritePost = await User.findById(userId);
  const favoritePost = userFavoritePost.favorites.find((item) => String(item) === String(postId));
  if (favoritePost) {
    await User.findOneAndUpdate({ _id: userId }, { $pull: { favorites: postId } }, { new: true }).exec();
    return false;
  } else {
    await User.findOneAndUpdate({ _id: userId }, { $push: { favorites: postId } }, { new: true }).exec();
    return true;
  }
};

export const getAllFavoritePostsService = async (userId) => {
  const user = await User.findById(userId);
  return user.favorites;
}
