import { User } from '../models/User.model.js';
import { Story } from '../models/Story.model.js';
import { Painting } from '../models/Painting.model.js';
import { EditableStoryItem } from '../models/EditableStoryItem.model.js';
import { UserRelationshipStatus, RelationshipsMapping } from '../models/UserRelationshipStatus.model.js';

export const getUserStories = async (req, res) => {
  let me = req.user;
  try {
    const followers = await UserRelationshipStatus.find({ me: me._id, status: RelationshipsMapping.following }).lean().exec();
    const friends = await UserRelationshipStatus.find({ them: me._id, status: RelationshipsMapping.following }).lean().exec();

    const friendsList = [];
    const followersList = [];

    for (let i = 0; i < friends.length; i++) {
      friendsList.push(friends[i].me);
    }
    for (let i = 0; i < followers.length; i++) {
      followersList.push(followers[i].them);
    }

    const followersFollowingsList = friendsList.concat(followersList, me._id);

    const users = await User.find({ _id: { $in: followersFollowingsList } });
    const stories = await Story.find({ creatorId: { $in: followersFollowingsList } })
      .populate([
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage',
            },
            {
              path: 'stats',
            },
          ],
        },
        {
          path: 'items',
        },
        {
          path: 'paintings',
        },
      ])
      .lean()
      .exec();
    const userStories = [];
    users?.map((user) => {
      const matchedStories = stories?.filter((story) => String(story.creator?._id) === String(user?._id));
      if (matchedStories?.length > 0) {
        userStories.push({
          creatorId: user._id,
          stories: matchedStories,
        });
      }
    });

    console.log("userStories", JSON.stringify(userStories))
    return res.status(200).json(userStories);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

export const viewStory = async (req, res) => {
  try {
    const { storyIds } = req.body;

    await Promise.all(
      storyIds.map(async (id) => {
        await Story.findByIdAndUpdate(id, { isViewed: true }, { new: true }).exec();
      }),
    );
    return res.status(200).json({
      message: 'story updated',
      statusCode: 200,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id)
      .populate([
        {
          path: 'creator',
          populate: [
            {
              path: 'profileImage',
            },
            {
              path: 'stats',
            },
          ],
        },
        {
          path: 'items',
        },
        {
          path: 'paintings',
        },
      ])
      .lean()
      .exec();
    return res.status(200).json(story);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

export const createStory = async (req, res) => {
  try {
    console.log('create api');
    const me = req.user;
    const { deviceHeight, deviceWidth, items, paintings, urls } = req.body;

    console.log('create api', urls);
    const story = new Story({ deviceHeight, deviceWidth });
    story.creator = me._id;

    await Promise.all(
      items.map(async (item, index) => {
        let url = '';
        if (item.itemType === 'image' || item.itemType === 'video') {
          url = urls.url;
        }
        const editableStoryItemData = await EditableStoryItem({ ...item, url, storyId: story._id });
        await editableStoryItemData.save();
      }),
    );

    story.items = await EditableStoryItem.find({
      storyId: story._id,
    });

    if (paintings) {
      await Promise.all(
        paintings?.map(async (painting) => {
          const paintingData = await Painting({ ...painting, storyId: story._id });
          await paintingData.save();
        }),
      );
    }

    story.paintings = await Painting.find({
      storyId: story._id,
    });

    await story.save();

    console.log('create api', story);
    const storyAdd = await Story.findOne({
      _id: story._id,
    })
      .populate([
        {
          path: 'creator',
        },
        {
          path: 'items',
        },
        {
          path: 'paintings',
        },
      ])
      .lean()
      .exec();
    console.log('create api', storyAdd);
    return res.status(200).json(storyAdd);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
      message: 'Internal server error',
    });
  }
};
