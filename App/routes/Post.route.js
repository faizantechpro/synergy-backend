import multer from 'multer';
import express from 'express';
import { videos, profileImage, materials } from '../../helper/cloudinaryUtils.js';
import {
  getPosts,
  getPost,
  getUserPost,
  getPostComments,
  getPostCommentsById,
  createPost,
  editPost,
  likePost,
  commentPost,
  savePost,
  unsSave,
  deleteComment,
  editComment,
  deletePost,
  likeComment,
  getPublicLink,
  favoritePost,
  addRemoveFavouritePost,
  discover,
  hideUnhidePost
} from '../controllers/Post.controller.js';

const postRouter = express.Router();
const ImageParser = multer({ storage: profileImage });
const materialParser = multer({ storage: materials });
const videoParser = multer({ storage: videos });

postRouter.route('/posts').get(getPosts);
postRouter.route('/post/:id').get(getPost);
postRouter.route('/user/posts').get(getUserPost);
postRouter.route('/post/:id/comments').get(getPostComments);
postRouter.route('/comment/:id/comments').get(getPostCommentsById);
postRouter.route('/post/create').post(createPost);
postRouter.route('/post/:id/delete').delete(deletePost);
postRouter.route('/post/:id/edit').put(editPost);
postRouter.route('/post/:id/like').post(likePost);
postRouter.route('/comment/:id/like').post(likeComment);
postRouter.route('/post/:id/comment').post(commentPost);
postRouter.route('/post/:id/favorite').post(favoritePost);
postRouter.route('/post/:id/save').post(savePost);
postRouter.route('/post/:id/unsave').post(unsSave);
postRouter.route('/post/:id/comment/:commentId').delete(deleteComment);
postRouter.route('/post/:id/comment/:commentId').put(editComment);
postRouter.route('/post/:id/publicLink').get(getPublicLink);
postRouter.route('/post/:id/favouritePost').post(addRemoveFavouritePost);
postRouter.route('/post/:id/hideUnhidePost').post(hideUnhidePost);
postRouter.route('/discover').get(discover);

export default postRouter;
