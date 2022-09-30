import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;


export const RelationshipsMapping = {
  notFriends: 0,
  following: 1,
  friends: 2
};

export const RequestStatusMapping = {
  noRequest: 0,
  followRequestSent: 1,
  followRequestReceived: 2,
  followRequestAccepted: 3,
  followRequestBackSent: 4,
  followRequestBackReceived: 5,
  followRequestBackAccepted: 6,
  unfollowRequestSent: 7,
  resetStatus: 8,
};


export const possibleRelationshipStatusesMessages = (key, user) => {
  const messages = {
    0: (user) => 'not-friends',
    1: (user) => `has sent you friend request `,
    2: (user) => `you have received follow request`,
    3: (user) => 'has accepted follow request',
    4: (user) => `has sent follow back request`,
    5: (user) => `has received follow back request`,
    6: (user) => `follow back request accepted`,
    7: (user) => `unfollowed you`,
  };

  if(!key){
    console.error("notification key cant be empty")
    return "notification "
  }

  return messages[key](user) || '';
};

const UserRelationshipStatusSchema = mongoose.Schema(
  {
    me: {
      type: ObjectId,
      ref: 'User',
    },
    them: {
      type: ObjectId,
      ref: 'User',
    },
    status: {
      type: Number,
      default: 0,
    },
    requestStatus: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);


export const UserRelationshipStatus = mongoose.model('UserRelationshipStatus', UserRelationshipStatusSchema);
