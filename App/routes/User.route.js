import express from 'express';
import multer from 'multer';
const userRouter = express.Router();
import {
  currentUser,
  searchUsers,
  getUser,
  deleteUser,
  userPosts,
  userShorts,
  userTagged,
  createUser,
  editUser,
  userStories,
  checkUserName,
  loginUser,
  logoutUser,
  userAction,
  relationshipStatus,
  followersList,
  userFriendsList,
  AddUserGeoLocation,
  GetUserGeoLocation,
  GetUserFriendsGeoLocation
} from '../controllers/User.controller.js';

import { videos, profileImage, materials } from '../../helper/cloudinaryUtils.js';

const ImageParser = multer({ storage: profileImage });
userRouter.get('/user/friends', userFriendsList);
userRouter.route('/user/login').post(loginUser);
userRouter.route('/user/logout').post(logoutUser);
userRouter.route('/user/search').get(searchUsers);
userRouter.route('/user/followers').get(followersList);
userRouter.route('/user/checkUserName').get(checkUserName);
userRouter.route('/user/current').get(currentUser);
userRouter.route('/user/editUser').put(editUser);
userRouter.route('/user/create').post(createUser);

userRouter.route('/user/:id').get(getUser);
userRouter.route('/user/:id').delete(deleteUser);
userRouter.route('/user/:id/posts').get(userPosts);
userRouter.route('/user/:id/stories').get(userStories);
userRouter.route('/user/:id/shorts').get(userShorts);
userRouter.route('/user/:id/tagged').get(userTagged);
userRouter.route('/user/:id/changeStatus').post(userAction);
userRouter.route('/user/:id/relationshipStatus').get(relationshipStatus);

userRouter.route('/user/location/addGeoLocation').post(AddUserGeoLocation);
userRouter.route('/user/location/getGeoLocation').get(GetUserGeoLocation);
userRouter.route('/user/location/getFriendsGeoLocation').get(GetUserFriendsGeoLocation);

export default userRouter;
