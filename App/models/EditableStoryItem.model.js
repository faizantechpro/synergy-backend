import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const EditableStoryItemSchema = mongoose.Schema(
  {
    position: {
      type: {
        dx: { type: Number },
        dy: { type: Number },
      },
    },
    scale: {
      type: Number,
    },
    rotation: {
      type: Number,
    },
    itemType: {
      type: String,
    },
    text: {
      type: String,
    },
    textList: [
      {
        type: String,
      },
    ],
    textColor: {
      type: Number,
    },
    textAlign: {
      type: String,
    },
    fontSize: {
      type: Number,
    },
    fontFamily: {
      type: Number,
    },
    fontAnimationIndex: {
      type: Number,
    },
    backgroundColor: {
      type: Number,
    },
    animationType: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    url: {
      type: String,
    },
    storyId: {
      type: ObjectId,
      ref: 'Story',
    },
  },
  { timestamps: true },
);

export const EditableStoryItem = mongoose.model('EditableStoryItem', EditableStoryItemSchema);
