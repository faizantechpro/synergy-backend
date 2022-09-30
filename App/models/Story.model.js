import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const StorySchema = mongoose.Schema(
  {
    deviceHeight: {
      type: Number,
    },
    deviceWidth: {
      type: Number,
    },
    isViewed: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: ObjectId,
      ref: 'User',
    },
    items: [
      {
        type: ObjectId,
        ref: 'EditableStoryItem',
      },
    ],
    paintings: [
      {
        type: ObjectId,
        ref: 'Painting',
      },
    ],
  },
  { timestamps: true },
);

export const Story = mongoose.model('Story', StorySchema);
