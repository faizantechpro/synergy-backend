import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export const RelationshipsMapping = {
  notFollowing: 0,
  following: 1,
};

export const RequestStatusMapping = {
  unFollow: 0,
  follow: 1,
};

export const possibleRelationshipStatusesMessages = (key, user, store) => {
  const messages = {
    0: (user, store) => `stop following ${store}`,
    1: (user, store) => `${user} has start following your store ${store}`,
  };

  if (!key && key !== 0) {
    console.error(key, "notification key cant be empty");
    return "notification";
  }

  return messages[key](user, store) || "";
};

const StoreRelationshipStatusSchema = mongoose.Schema(
  {
    me: {
      type: ObjectId,
      ref: "User",
    },
    them: {
      type: ObjectId,
      ref: "Store",
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const StoreRelationshipStatus = mongoose.model(
  "StoreRelationshipStatus",
  StoreRelationshipStatusSchema
);
