import mongoose from "mongoose";

const DaySchema = new mongoose.Schema(
  {
    isOpen: {
      type: Boolean,
      default: false,
    },
    allDay: {
      type: Boolean,
    },
    from: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const StoreTimingSchema = mongoose.Schema(
  {
    storeId: {
      type: String,
      ref: "Store",
    },
    sunday: DaySchema,
    monday: DaySchema,
    tuesday: DaySchema,
    wednesday: DaySchema,
    thursday: DaySchema,
    friday: DaySchema,
    saturday: DaySchema,
  },
  { timestamps: true }
);

export const StoreTiming = mongoose.model("StoreTiming", StoreTimingSchema);
