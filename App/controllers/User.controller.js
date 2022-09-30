import { User } from '../models/User.model.js'
import { Post } from '../models/Post.model.js'
import { TagDetail } from '../models/TagDetail.model.js'
import { SynergyImage } from '../models/SynergyImage.model.js'
import { UserProfileStats } from '../models/UserProfileStats.model.js'
import {
  UserRelationshipStatus,
  RelationshipsMapping,
  RequestStatusMapping,
  possibleRelationshipStatusesMessages
} from '../models/UserRelationshipStatus.model.js'
import { sendFCMNotification } from '../../helper/sendNotification.js'
import { saveNotification } from '../services/Notification.service.js'
import {
  checkUserNameService,
  searchUsersService,
  getAllUsersService,
  getUserByIdService,
  deleteUserByIdService,
  addFcmTokenService,
  removeFcmTokenService
} from '../services/User.service.js'

import { defautlResponse, errorResponse } from '../../helper/utils.js'
import { dummyLocations } from '../../helper/dummyGeoLocation.js'
import { AppConfig } from '../models/AppConfig.model.js'

const getUserById = async id => {
  const user = await User.findById(id)
    .populate([
      {
        path: 'profileImage'
      },
      {
        path: 'stats'
      }
    ])
    .lean()
    .exec()

  return user
}

export const getUserByUId = async uid => {
  const user = await User.findOne({ uid })
    .populate([
      {
        path: 'profileImage'
      },
      {
        path: 'stats'
      }
    ])
    .lean()
    .exec()

  return user
}

export const checkUserName = async (req, res) => {
  try {
    const { userName } = req.query
    const user = await checkUserNameService(userName)
    if (user) {
      return res
        .status(200)
        .json({ message: 'user name already taken', statusCode: 200 })
    } else {
      return res
        .status(200)
        .json({ message: 'user name not found', statusCode: 404 })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { fcm } = req.body
    const user = await addFcmTokenService(fcm, req.user._id)
    return res
      .status(200)
      .json({ user, status: 'fcm token updated', statusCode: 200 })
  } catch (e) {
    console.error('errror', e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const logoutUser = async (req, res) => {
  try {
    const { fcm } = req.body
    const user = await removeFcmTokenService(fcm, req.user._id)
    return res
      .status(200)
      .json({ user, status: 'fcm token updated', statusCode: 200 })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const createUser = async (req, res) => {
  try {
    const { id } = req.body

    const existingUser = await User.findOne({ uid: id })

    if (existingUser) {
      const { name, profileImage } = req.body
      existingUser.name = name

      const profileImageNew = new SynergyImage({ userId: existingUser._id })
      profileImageNew.secureUrl = profileImage || ''
      profileImageNew.url = profileImage || ''
      await profileImageNew.save()
      existingUser.profileImage = profileImageNew._id
      await existingUser.save()

      const user = await getUserByUId(id)
      return res.status(200).json(user)
    }

    const user = new User(req.body)
    user.set({
      uid: req.uid,
      updated: new Date()
    })

    await user.save()
    const stats = new UserProfileStats({ userId: user._id })
    await stats.save()

    const profileImage = new SynergyImage({ userId: user._id })
    await profileImage.save()

    await User.findByIdAndUpdate(
      user._id,
      { stats: stats._id, profileImage: profileImage._id },
      {
        new: true
      }
    )

    await new AppConfig({ user: user._id }).save()

    const createdUser = await getUserById(user._id)
    return res.status(200).json(createdUser)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query
    console.log('query', q)
    let me = req.user
    let users = []
    if (q) {
      users = await searchUsersService(q)
    } else {
      users = await getAllUsersService()
    }
    users = users.filter(user => user._id.toString() !== me._id.toString())

    for (let i = 0; i < users.length; i++) {
      const status = await UserRelationshipStatus.findOne({
        me: me._id,
        them: users[i]._id.toString()
      })

      users[i].status = status?.status || RelationshipsMapping.notFriends
      users[i].requestStatus =
        status?.requestStatus || RequestStatusMapping.noRequest
    }

    return res.status(200).json(users)
  } catch (e) {
    console.error('error', e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await getUserByIdService(id)
    return res.status(200).json(user)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await deleteUserByIdService(id)
    return res.status(200).json({ message: 'user deleted' })
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const currentUser = async (req, res) => {
  try {
    const user = await getUserByIdService(req.user._id)
    return res.status(200).json(user)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const editUser = async (req, res) => {
  try {
    console.log('inside edit user', req.body)
    if (req.body.url) {
      const largeImageData = {
        url: req.body.url,
        secureUrl: req.body.url,
        width: 400,
        height: 400
      }
      const profileImage = new SynergyImage(largeImageData)
      await profileImage.save()

      req.body.profileImage = profileImage._id
    }

    const user = await User.findOneAndUpdate({ uid: req.uid }, req.body, {
      new: true
    })
    const updatedUser = await getUserById(user._id)

    return res.status(200).json(updatedUser)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

export const userPosts = async (req, res) => {
  try {
    const { id } = req.params
    const { next = new Date(), limit = 20 } = req.query
    const posts = await Post.find({
      type: 'post',
      creator: id,
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
          path: 'stats'
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

export const userStories = async (req, res) => {
  try {
    const { id } = req.params
    const { next = new Date(), limit = 20 } = req.query
    const posts = await Post.find({
      type: 'story',
      creator: id,
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
          path: 'stats'
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

export const userShorts = async (req, res) => {
  try {
    const { id } = req.params
    const { next = new Date(), limit = 20 } = req.query
    const posts = await Post.find({
      type: 'shorts',
      creator: id,
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
          path: 'stats'
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

export const userTagged = async (req, res) => {
  try {
    const { id } = req.params
    const { next = new Date(), limit = 20 } = req.query
    const tags = await TagDetail.find({
      userId: id,
      createdAt: { $lt: next }
    })
      .sort({
        _id: -1
      })
      .limit(limit)
      .populate([
        {
          path: 'postId'
        }
      ])
      .exec()
    const createdAtVal =
      tags[tags.length - 1] && tags[tags.length - 1].createdAt
    return res.status(200).json({ tags, next: createdAtVal })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const userAction = async (req, res) => {
  const { id } = req.params
  let { requestStatus } = req.body
  let me = req.user

  console.log('requestStatus status', requestStatus)

  try {
    let status = RelationshipsMapping.notFriends

    if (requestStatus === RequestStatusMapping.followRequestSent) {
      await UserRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        { requestStatus },
        { new: true, upsert: true }
      )
      await UserRelationshipStatus.findOneAndUpdate(
        { me: id, them: me._id },
        { requestStatus: RequestStatusMapping.followRequestReceived },
        { new: true, upsert: true }
      )
    } else if (requestStatus === RequestStatusMapping.followRequestAccepted) {
      await UserRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        {
          requestStatus: RequestStatusMapping.followRequestBackSent,
          status: RelationshipsMapping.followRequestBackSent
        },
        { new: true, upsert: true }
      )
      await UserProfileStats.findOneAndUpdate(
        { userId: me._id },
        { $inc: { following: 1 } }
      )
      await UserRelationshipStatus.findOneAndUpdate(
        { me: id, them: me._id },
        {
          requestStatus: RequestStatusMapping.noRequest,
          status: RelationshipsMapping.following
        },
        { new: true, upsert: true }
      )
      await UserProfileStats.findOneAndUpdate(
        { userId: id },
        { $inc: { followers: 1 } }
      )
    } else if (
      requestStatus === RequestStatusMapping.followRequestBackAccepted
    ) {
      await UserRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        {
          requestStatus: RequestStatusMapping.noRequest,
          status: RelationshipsMapping.following
        },
        { new: true, upsert: true }
      )
      await UserProfileStats.findOneAndUpdate(
        { userId: id },
        { $inc: { following: 1 } }
      )
      await UserRelationshipStatus.findOneAndUpdate(
        { me: id, them: me._id },
        {
          requestStatus: RequestStatusMapping.noRequest,
          status: RelationshipsMapping.following
        },
        { new: true, upsert: true }
      )
      await UserProfileStats.findOneAndUpdate(
        { userId: me._id },
        { $inc: { followers: 1 } }
      )
    } else if (requestStatus === RequestStatusMapping.unfollowRequestSent) {
      await UserRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        {
          requestStatus: RequestStatusMapping.noRequest,
          status: RelationshipsMapping.notFriends
        },
        { new: true, upsert: true }
      )
    } else if (requestStatus === RequestStatusMapping.followRequestBackSent) {
      await UserRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        {
          requestStatus: RequestStatusMapping.followRequestSent,
          status: RelationshipsMapping.following
        },
        { new: true, upsert: true }
      )

      await UserRelationshipStatus.findOneAndUpdate(
        { me: id, them: me._id },
        {
          requestStatus: RequestStatusMapping.followRequestBackReceived,
          status: RelationshipsMapping.following
        },
        { new: true, upsert: true }
      )
    } else if (requestStatus === RequestStatusMapping.resetStatus) {
      await UserRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        {
          requestStatus: RequestStatusMapping.noRequest,
          status: RelationshipsMapping.notFriends
        },
        { new: true, upsert: true }
      )

      await UserProfileStats.findOneAndUpdate(
        { userId: me._id },
        { $inc: { followers: -1 } }
      )
    } else {
      console.log('requestStatus', requestStatus)
    }

    const user = await getUserByIdService(id)

    const message = possibleRelationshipStatusesMessages(
      requestStatus,
      user.name
    )

    console.log('sending message', message)
    await Promise.all(
      user.fcm.map(async item => {
        await sendFCMNotification(item.token, {
          title: me.name,
          body: message
        })
      })
    )

    const currentStatus = await UserRelationshipStatus.findOne({
      me: me._id,
      them: id
    })
      .lean()
      .exec()

    console.log('currentStatus', currentStatus)

    await saveNotification({
      title: 'Notification',
      body: message,
      type: status,
      senderId: me._id,
      receiverId: id,
      status: currentStatus.status,
      requestStatus: currentStatus.requestStatus
    })

    return res.status(200).json({
      message: message,
      statusCode: 200
    })
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const relationshipStatus = async (req, res) => {
  let me = req.user
  const { id } = req.params
  const status = await UserRelationshipStatus.findOne({ me: me._id, them: id })

  return status
    ? res.status(200).json({ status: status.status })
    : res.status(200).json({ status: RelationshipsMapping.notFriends })
}

export const followersList = async (req, res) => {
  let me = req.user
  try {
    const followers = await UserRelationshipStatus.find({
      me: me._id,
      status: RelationshipsMapping.following
    }).populate('them')
    res.status(200).json(followers)
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      message: 'Internal server error',
      error: err
    })
  }
}

export const userFriendsList = async (req, res) => {
  console.log('get friends list dwdewdwedw')
  let me = req.user
  console.log('me', me)
  try {
    let friends = await UserRelationshipStatus.find({
      them: me._id,
      status: RelationshipsMapping.following
    }).populate([
      {
        path: 'me',
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

    friends = friends.map(friend => friend.me)

    defautlResponse({ res, response: friends, message: 'friends lists' })
  } catch (err) {
    console.log('err', err)
    errorResponse({ res, error: err })
  }
}

export const AddUserGeoLocation = async (req, res) => {
  try {
    const me = req.user
    const { longitude, latitude } = req.body
    const location = { type: 'Point', coordinates: [longitude, latitude] }
    const user = await User.findByIdAndUpdate(
      me._id,
      { location },
      { new: true }
    )
    res.status(200).json(user)
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      message: 'Internal server error',
      error: err
    })
  }
}

export const GetUserGeoLocation = async (req, res) => {
  try {
    const me = req.user
    const { longitude, latitude } = req.body
    const location = { type: 'Point', coordinates: [longitude, latitude] }

    // const user = await User.aggregate([
    //   {
    //     $geoNear: {
    //       near: location,
    //       minDistance: 2,
    //       distanceField: "dist.calculated",
    //       spherical: true,
    //     },
    //   },
    // ]);

    defautlResponse({
      res,
      response: [
        {
          _id: '62dee052c4a7af7b07443fcb',

          profileImage: {
            url:
              'http://res.cloudinary.com/dktnhmsjx/image/upload/v1658773693/synergy/materials/file_nf09no.webp',
            secureUrl:
              'https://res.cloudinary.com/dktnhmsjx/image/upload/v1658773693/synergy/materials/file_nf09no.webp',
            width: 1080,
            height: 1440
          },
          location: { type: 'point', coordinates: [-29.791, -179.70663] },
          name: 'Hasnat',
          handle: 'hasnat98044',
          email: 'hasnat98044@gmail.com'
        }
      ],
      message: 'friends'
    })
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      message: 'Internal server error',
      error: err
    })
  }
}

export const GetUserFriendsGeoLocation = async (req, res) => {
  try {
    const me = req.user
    const { longitude, latitude } = req.body
    const location = { type: 'Point', coordinates: [longitude, latitude] }
    const friendsList = []
    const friends = await UserRelationshipStatus.find({
      them: me._id,
      status: RelationshipsMapping.following
    })
    for (let i = 0; i < friends.length; i++) {
      friendsList.push(friends[i].me)
    }

    // const user = await User.aggregate([
    //   {
    //     $geoNear: {
    //       near: location,
    //       minDistance: 2,
    //       distanceField: "dist.calculated",
    //       query: {
    //         _id: {
    //           $in: friendsList,
    //         },
    //       },
    //       spherical: true,
    //     },
    //   },
    // ]);

    const user = dummyLocations

    res.status(200).json(user)
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      message: 'Internal server error',
      error: err
    })
  }
}
