import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const FavouriteSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    postId: [
      {
        type: ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true },
);

export const Favourite = mongoose.model('Favourite', FavouriteSchema);
