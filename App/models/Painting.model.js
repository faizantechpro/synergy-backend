import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const PaintingSchema = mongoose.Schema(
  {
    points: [
      {
        x: { type: Number },
        y: { type: Number },
        p: { type: Number },
      },
    ],
    size: {
      type: Number,
    },
    thinning: {
      type: Number,
    },
    smothing: {
      type: Number,
    },
    streamLine: {
      type: Number,
    },
    isComplete: {
      type: Boolean,
    },
    lineColor: {
      type: String,
    },
    simulatePressure: {
      type: Boolean,
    },
    paintingType: {
      type: String,
    },
    storyId: {
      type: ObjectId,
      ref: 'Story',
    },
  },
  { timestamps: true },
);

export const Painting = mongoose.model('Painting', PaintingSchema);
