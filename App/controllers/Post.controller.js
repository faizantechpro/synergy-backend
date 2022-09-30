import { Post } from '../models/Post.model.js'
import { Like } from '../models/Like.model.js'
import { User } from '../models/User.model.js'
import { findHashtags, defautlResponse } from '../../helper/utils.js'
import { Comments } from '../models/Comments.model.js'
import { PostStats } from '../models/PostStats.model.js'
import { TagDetail } from '../models/TagDetail.model.js'
import { PostContent } from '../models/PostContent.model.js'
import { SynergyImage } from '../models/SynergyImage.model.js'
import { PostRelation } from '../models/PostRelation.model.js'
import { UserProfileStats } from '../models/UserProfileStats.model.js'
import { LikeUnLikePostService } from '../services/Like.service.js'
import { sendFCMNotification } from '../../helper/sendNotification.js'
import { LikeUnLikeCommentsService } from '../services/Comments.service.js'
import {
  favoritePostService,
  getAllFavoritePostsService
} from '../services/User.service.js'
import {
  UserRelationshipStatus,
  RelationshipsMapping
} from '../models/UserRelationshipStatus.model.js'
import { Favourite } from '../models/Favourite.model.js'
import { PostLimit } from '../../helper/getPostLimits.js'
import { AddFavouriteRemoveFavouritePostService } from '../services/Favourite.service.js'
import { saveNotification } from '../services/Notification.service.js'
import { add, hashTagsFakeData } from '../../helper/discover.js'
import { HidePosts } from '../models/HidePost.model.js'
import { getAllHiddenPostsService, hideUnhidePostService } from '../services/HidePost.service.js'

export const getPosts = async (req, res) => {
  let me = req.user
  try {
    const followers = await UserRelationshipStatus.find({
      me: me._id,
      status: RelationshipsMapping.following
    })
      .lean()
      .exec()
    const friends = await UserRelationshipStatus.find({
      them: me._id,
      status: RelationshipsMapping.following
    })
      .lean()
      .exec()

    const user = await User.findOne({ _id: me._id })
      .lean()
      .exec()

    let { page } = req.query
    page = page ? parseInt(page) : 1

    const next = new Date()

    const friendsList = []
    const followersList = []
    const interestsList = []

    const userInterests = user.interests

    const interestContent = await PostContent.find({
      interests: { $in: userInterests }
    })

    for (let i = 0; i < interestContent.length; i++) {
      interestsList.push(interestContent[i].postId)
    }

    for (let i = 0; i < friends.length; i++) {
      friendsList.push(friends[i].me)
    }
    for (let i = 0; i < followers.length; i++) {
      followersList.push(followers[i].them)
    }

    const PostLimits = PostLimit(friendsList, followersList, interestsList)

    console.log('PostLimits', PostLimits)
    const friendskipIndex = (page - 1) * PostLimits.friendsLimit
    const followerSkipIndex = (page - 1) * PostLimits.followersLimit
    const interestSkipIndex = (page - 1) * PostLimits.interestsLimit

    const firendsPosts = await Post.find({
      creator: { $in: friendsList },
      viewBy: { $ne: "onlyMe" },
      type: 'post',
      createdAt: { $lt: next }
    })
      .sort({ _id: -1 })
      .limit(PostLimits.friendsLimit)
      .skip(friendskipIndex)
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'stats'
        }
      ])
      .lean()
      .exec()

    const followerPosts = await Post.find({
      creator: { $in: followersList },
      viewBy: { $ne: "onlyMe" },
      type: 'post',
      createdAt: { $lt: next }
    })
      .sort({ _id: -1 })
      .limit(PostLimits.followersLimit)
      .skip(followerSkipIndex)
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'stats'
        }
      ])
      .lean()
      .exec()

    const interestPosts = await Post.find({
      type: 'post',
      _id: { $in: interestsList },
      viewBy: { $eq: "public" },
      createdAt: { $lt: next }
    })
      .sort({ _id: -1 })
      .limit(PostLimits.interestsLimit)
      .skip(interestSkipIndex)
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'stats'
        }
      ])
      .lean()
      .exec()

    const selfPosts = await Post.find({
      creator: { $in: [me._id] },
      type: 'post',
      createdAt: { $lt: next }
    })
      .sort({ _id: -1 })
      .limit(PostLimits.selfLimit)
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'stats'
        }
      ])
      .lean()
      .exec()

    const postsArr = []
    let posts = postsArr.concat(
      firendsPosts,
      followerPosts,
      interestPosts,
      selfPosts
    )

    const allFavorites = await getAllFavoritePostsService(me._id)
    const allHiddens = await getAllHiddenPostsService(me._id)
    posts = posts
      .sort((a, b) => {
        return a.createdAt - b.createdAt
      })
      .map(post => {
        console.log('post is', post)
        post.isFavorite = allFavorites.includes(post._id)
        post.isHidden = allHiddens ? allHiddens?.includes(post._id) : false
        return post
      })

    const createdAtVal =
      posts[posts.length - 1] && posts[posts.length - 1].createdAt
    return res.status(200).json({ posts, next: createdAtVal })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      err: e.message,
      message: 'Internal server error'
    })
  }
}

export const getPost = async (req, res) => {
  try {
    let me = req.user
    const { id } = req.params
    const post = await Post.findById(id)
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'stats'
        },
        {
          path: 'likeStats'
        }
      ])
      .exec()

    let postRelation = await PostRelation.findOne({
      post: post._id,
      user: me._id
    })
    if (!postRelation) {
      postRelation = new PostRelation({
        liked: false,
        post: post._id,
        user: me._id,
        relationship:
          String(post.creator._id) === String(me._id)
            ? 'post:mine'
            : 'post:unrelated'
      })
      await postRelation.save()
    }

    return res.status(200).json({ post, relation: postRelation })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const getUserPost = async (req, res) => {
  try {
    const { next = new Date(), limit = 20 } = req.query
    let me = req.user
    const posts = await Post.find({
      type: 'post',
      creator: me._id,
      createdAt: { $lt: next }
    })
      .sort({
        _id: -1
      })
      .limit(limit)
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'stats'
        },
        {
          path: 'likeStats'
        }
      ])
      .exec()
    const createdAtVal =
      posts[posts.length - 1] && posts[posts.length - 1].createdAt
    return res.status(200).json({ posts, next: createdAtVal })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const createPost = async (req, res) => {
  try {
    let me = req.user
    const { description, details, location, urls } = req.body
    // Calculate hashtags from description
    const hashTags = findHashtags(description)
    const post = new Post({ description, location, hashTags })
    post.creator = me._id
    const stats = new PostStats({ postId: post._id })
    await stats.save()
    const likeStats = new Like({ postId: post._id })
    await likeStats.save()
    const postContentIds = []
    for (let i = 0; i < urls.length; i++) {
      let currentUrl = urls[i]

      console.log('currentUrl', currentUrl)

      const asset = details.find(item => item.assetId == currentUrl.assetId)
      // const parse = JSON.parse(details);

      console.log('asset', asset)
      const largeImageData = {
        url: currentUrl.url,
        secureUrl: currentUrl.url,
        postId: post._id
      }

      const thumbnailImageData = {
        width: 320,
        height: 320,
        url: currentUrl.url,
        secureUrl: currentUrl.url,
        postId: post._id
      }
      const largeImage = new SynergyImage(largeImageData)
      await largeImage.save()
      const thumbnailImage = new SynergyImage(thumbnailImageData)
      await thumbnailImage.save()

      const postContentData = {
        large: largeImage._id,
        thumbnail: thumbnailImage._id,
        type: currentUrl.assetType,
        filter: asset.filter,
        postId: post._id
      }
      const postContent = new PostContent(postContentData)
      const tagLists = []
      if (asset.tags) {
        for (let i = 0; i < asset.tags.length; i++) {
          const tagData = asset.tags[i]
          tagData.postContentId = postContent._id
          tagData.postId = post._id
          const tags = new TagDetail(tagData)
          await tags.save()
          tagLists.push(tags)
        }
      }
      postContentIds.push(postContent._id)
      postContent.tags = tagLists
      await postContent.save()
    }
    post.content = postContentIds
    post.contents = await PostContent.find({
      postId: post._id
    })
    post.stats = stats._id
    post.likeStats = likeStats._id
    await post.save()

    const postAdd = await Post.findOne({
      _id: post._id
    })
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'stats'
        },
        {
          path: 'likeStats'
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        }
      ])
      .exec()

    await UserProfileStats.updateOne({ userId: me._id }, { $inc: { posts: 1 } })

    return res.status(200).json(postAdd)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const deletePost = async (req, res) => {
  try {
    let me = req.user
    const { id } = req.params
    console.log('post to be deleted id', id)
    console.log('current user', me._id)
    await Post.deleteOne({ _id: id, creator: me._id })
    await PostContent.deleteMany({ postId: id })
    await TagDetail.deleteMany({ postId: id })
    await SynergyImage.deleteMany({ postId: id })
    await PostStats.deleteOne({ postId: id })
    await UserProfileStats.updateOne(
      { userId: me._id },
      { $inc: { posts: -1 } }
    )

    return res.status(200).json({ message: 'post deleted successfully' })
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const editPost = async (req, res) => {
  try {
    const { id } = req.params

    const post = await Post.findOne({ _id: id })
    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      })
    }
    const { description, details, location, urls } = req.body

    if (description) post.description = description

    if (location) post.location = location
    const postContentIds = []

    for (let i = 0; i < urls?.length; i++) {
      let currentUrl = urls[i]

      const asset = details.find(item => item.assetId == currentUrl.assetId)
      const largeImageData = {
        url: currentUrl.url,
        secureUrl: currentUrl.url,
        postId: post._id
      }

      const thumbnailImageData = {
        width: 320,
        height: 320,
        url: currentUrl.url,
        secureUrl: currentUrl.url,
        postId: post._id
      }
      const largeImage = new SynergyImage(largeImageData)
      await largeImage.save()
      const thumbnailImage = new SynergyImage(thumbnailImageData)
      await thumbnailImage.save()

      const postContentData = {
        large: largeImage._id,
        thumbnail: thumbnailImage._id,
        type: currentUrl.assetType,
        filter: asset.filter,
        postId: post._id
      }

      const postContent = new PostContent(postContentData)
      const tagLists = []
      if (asset.tags) {
        for (let i = 0; i < asset.tags.length; i++) {
          const tagData = asset.tags[i]
          tagData.postContentId = postContent._id
          tagData.postId = post._id
          const tags = new TagDetail(tagData)
          await tags.save()
          tagLists.push(tags)
        }
      }
      postContentIds.push(postContent._id)
      postContent.tags = tagLists
      await postContent.save()
    }

    if (postContentIds.length > 0) post.contents = postContentIds
    await post.save()

    const updatedPost = await Post.findById(id)
      .populate([
        {
          path: 'contents',
          populate: [
            {
              path: 'large'
            },
            {
              path: 'thumbnail'
            },
            {
              path: 'tags'
            }
          ]
        },
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'stats'
        },
        {
          path: 'likeStats'
        }
      ])
      .exec()
    return res.status(200).json(updatedPost)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user
    const post = await Post.findOne({ _id: id })
      .populate([
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        }
      ])
      .exec()
    const postLiked = await LikeUnLikePostService(id, me._id)
    if (postLiked) {
      const postRelation = await PostRelation.findOneAndUpdate(
        { post: post._id, user: me._id },
        { liked: true, updatedAt: new Date() },
        {
          new: true
        }
      )
      if (!postRelation) {
        const postRelation = new PostRelation({
          liked: true,
          post: post._id,
          user: me._id,
          relationship:
            String(post.creator._id) === String(me._id)
              ? 'post:mine'
              : 'post:unrelated'
        })
        await postRelation.save()
      }
      await PostStats.findOneAndUpdate({ postId: id }, { $inc: { likes: 1 } })

      const message = `${me.name} liked your post`
      await Promise.all(
        post.creator.fcm.map(async item => {
          await sendFCMNotification(item.token, {
            title: 'Notification',
            body: message
          })
        })
      )

      await saveNotification({
        title: 'New Like',
        body: message,
        type: 0,
        senderId: me._id,
        receiverId: post.creator._id
      })
      return res.status(200).json({ message: 'post liked' })
    } else {
      await PostRelation.findOneAndUpdate(
        { post: post._id, user: me._id },
        { liked: false, updatedAt: new Date() },
        {
          new: true
        }
      )
      await PostStats.findOneAndUpdate({ postId: id }, { $inc: { likes: -1 } })
      return res.status(200).json({ message: 'post un liked' })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const favoritePost = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user
    const favoritePost = await favoritePostService(id, me._id)
    if (favoritePost) {
      return res
        .status(200)
        .json({ message: 'Post added to favorites', StatusCode: 200 })
    } else {
      return res
        .status(200)
        .json({ message: 'Post removed from favorites', StatusCode: 200 })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const likeComment = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user
    const comment = await Comments.findOne({ _id: id })
      .populate([
        {
          path: 'userId',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        }
      ])
      .exec()
    const commentLiked = await LikeUnLikeCommentsService(id, me._id)
    if (commentLiked) {
      const message = `${me.name} liked your comment`
      await Promise.all(
        comment.userId.fcm.map(async item => {
          await sendFCMNotification(item.token, {
            title: 'Notification',
            body: message
          })
        })
      )
      return res.status(200).json({ message: 'comment liked' })
    } else {
      return res.status(200).json({ message: 'comment un liked' })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const savePost = async (req, res) => {
  try {
    const { id } = req.params
    const currentPost = await Post.findOne({ _id: id })
    currentPost.savePost = true
    await currentPost.save()
    await PostStats.findOneAndUpdate({ postId: id }, { $inc: { saves: 1 } })
    return res.status(200).json({ message: 'post saved' })
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const getPostComments = async (req, res) => {
  try {
    const { id } = req.params
    let postComments = await Comments.find({ postId: id })
      .populate([
        {
          path: 'userId',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'subComments'
        }
      ])
      .exec()

    return res.status(200).json(postComments)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const getPostCommentsById = async (req, res) => {
  try {
    const { id } = req.params
    let postComments = await Comments.find({ _id: id })
      .populate([
        {
          path: 'userId',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        },
        {
          path: 'subComments'
        }
      ])
      .exec()

    return res.status(200).json(postComments)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const unsSave = async (req, res) => {
  try {
    const { id } = req.params
    const currentPost = await Post.findOne({ _id: id })
    currentPost.savePost = false
    await currentPost.save()
    await PostStats.findOneAndUpdate({ postId: id }, { $inc: { saves: -1 } })
    return res.status(200).json({ message: 'post unsaved' })
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user
    const { comment, parentCommentId } = req.body

    console.log('req.body', req.body)
    const newComment = new Comments({
      postId: id,
      userId: me._id,
      comment,
      parentCommentId
    })
    await newComment.save()

    if (parentCommentId) {
      const parentComment = await Comments.findOne({ _id: parentCommentId })
      parentComment.subComments.push(newComment._id)
      await parentComment.save()
    }

    await PostStats.findOneAndUpdate({ postId: id }, { $inc: { comments: 1 } })

    const post = await Post.findOne({ _id: id })
      .populate('creator')
      .exec()
    const commentAdded = await Comments.findById(newComment._id)
      .populate([
        {
          path: 'userId',
          populate: [
            {
              path: 'profileImage'
            },
            {
              path: 'stats'
            }
          ]
        }
      ])
      .exec()

    const message = `${me.name} commented on your post`

    console.log('post.creator', post.creator)

    await Promise.all(
      post.creator.fcm.map(async item => {
        await sendFCMNotification(item.token, {
          title: 'Notification',
          body: message
        })
      })
    )

    await saveNotification({
      title: 'New Comment',
      body: message,
      type: 0,
      senderId: me._id,
      receiverId: post.creator._id
    })

    return res.status(200).json(commentAdded)
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}

export const editComment = async (req, res) => {
  try {
    const { id } = req.params
    const { commentId } = req.params
    const comment = await Comments.findOne({ _id: commentId })
    if (comment) {
      comment.comment = req.body.comment
      await comment.save()
      return res.status(200).json({ message: 'comment edited' })
    } else {
      return res.status(500).json({
        error: 'comment not found',
        message: 'Something went wrong'
      })
    }
  } catch (err) {
    console.error(e)
    return res.status(500).json({
      error: e,
      message: 'Internal server error'
    })
  }
}
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const { commentId } = req.body
    await PostStats.findOneAndUpdate({ postId: id }, { $inc: { comments: -1 } })
    const comment = await Comments.findOne({ _id: commentId })
    await Comments.findByIdAndRemove(commentId)

    if (comment.parentCommentId) {
      await Comments.findOneAndUpdate(
        { parentCommentId: commentId },
        { $pull: { subComments: commentId } }
      )
    }

    await PostStats.findOneAndUpdate({ postId: id }, { $inc: { comments: -1 } })
    return res.status(200).json({ message: 'comment deleted' })
  } catch (err) {
    console.error(e)
    return res.status(500).json({
      error: err,
      message: 'Internal server error'
    })
  }
}

export const getPublicLink = async (req, res) => {
  const { id } = req.params
  const post = await Post.findOne({ _id: id })
  if (post) {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000'
    return res.status(200).json(`${baseUrl}/post/${id}/publicLink`)
  } else {
    return res.status(500).json({
      error: 'post not found',
      message: 'Something went wrong'
    })
  }
}

export const addRemoveFavouritePost = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user
    const isFavourite = await Favourite.findOne({ userId: me._id })
    if (isFavourite === null) {
      await Favourite.create({
        userId: me._id,
        postId: id
      })
      return res.status(200).json({ message: 'Post Added to Favourites' })
    } else {
      const isfavoritePost = await AddFavouriteRemoveFavouritePostService(
        me._id,
        id
      )
      if (isfavoritePost) {
        return res.status(200).json({ message: 'Post Added to Favourites' })
      } else {
        return res.status(200).json({ message: 'Post Removed from Favorites' })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: err,
      message: 'Internal server error'
    })
  }
}

export const hideUnhidePost = async (req, res) => {
  try {
    const { id } = req.params
    const me = req.user
    const isHidden = await HidePosts.findOne({ userId: me._id })
    if (isHidden === null) {
      await HidePosts.create({
        userId: me._id,
        hiddenPosts: id
      })
      return res.status(200).json({ message: 'Post is hide' })
    } else {
      const isHiddenPost = await hideUnhidePostService(
        me._id,
        id
      )
      if (isHiddenPost) {
        return res.status(200).json({ message: 'Post is hide' })
      } else {
        return res.status(200).json({ message: 'Post is Unhide' })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: err,
      message: 'Internal server error'
    })
  }
}

export const discover = async (req, res) => {
  try {
    const users = await User.find({}).populate('stats').populate('profileImage')
    const popularCreator = users
      .sort((a, b) => {
        return b.stats.followers - a.stats.followers
      })
      .slice(0, 20)

    const hashTags = ['#fitness', '#travel', '#food', '#party', '#hi']

    const hashTagsData = []

    for (let i = 0; i < hashTags.length; i++) {
      const element = hashTags[i]

      const hashTagsPost = await Post.find({ hashTags: { $in: element } })
        .populate([
          {
            path: 'contents',
            populate: [
              {
                path: 'large'
              },
              {
                path: 'thumbnail'
              },
              {
                path: 'tags'
              }
            ]
          },
          {
            path: 'creator',
            populate: [
              {
                path: 'profileImage'
              },
              {
                path: 'stats'
              }
            ]
          },
          {
            path: 'stats'
          }
        ])
        .sort({ createdAt: -1 })
        .lean()

      const finalRes = {
        type: 'list',
        title: element,
        item: hashTagsPost
      }

      console.log(finalRes)
      hashTagsData.push(finalRes)
    }

    const result = [
      {
        type: 'banner',
        title: 'Ads Slider',
        item: add
      },
      {
        type: 'list',
        title: 'Popular Creator',
        item: popularCreator
      },
      hashTagsFakeData[0],
      hashTagsFakeData[1]
    ]

    return defautlResponse({ response: result, res })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: err,
      message: 'Internal server error'
    })
  }
}
