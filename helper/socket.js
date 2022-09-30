import {
  RelationshipsMapping,
  UserRelationshipStatus,
} from "../App/models/UserRelationshipStatus.model.js";

export const getFriends = async (id) => {
  const friendsList = [];
  const followersList = [];
  const followers = await UserRelationshipStatus.find({
    me: id,
    status: RelationshipsMapping.following,
  })
    .lean()
    .exec();
  const friends = await UserRelationshipStatus.find({
    them: id,
    status: RelationshipsMapping.following,
  })
    .lean()
    .exec();

  for (let i = 0; i < friends.length; i++) {
    friendsList.push(friends[i].me);
  }
  for (let i = 0; i < followers.length; i++) {
    followersList.push(followers[i].them);
  }

  const allFriends = friendsList.concat(followersList);
  return allFriends;
};
