import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const PrivacySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "",
  },
  date: {
    type: String,
    trim: true,
    default: "",
  },
  discription: {
    type: String,
    trim: true,
    default: "",
  },
});
const DefinitionsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "",
  },
  definitions: [
    {
      heading: {
        type: String,
        trim: true,
        default: "",
      },
      discription: {
        type: String,
        trim: true,
        default: "",
      },
    },
  ],
});
const InformationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "",
  },
  subTitle: {
    type: String,
    trim: true,
    default: "",
  },
  definitions: [
    {
      heading: {
        type: String,
        trim: true,
        default: "",
      },
      discription: {
        type: String,
        trim: true,
        default: "",
      },
    },
  ],
});

const PrivacyPolicySchema = mongoose.Schema(
  {
    privacyPolicy: {
      type: PrivacySchema,
    },
    definitions: {
      type: DefinitionsSchema,
    },
    information: {
      type: InformationSchema,
    },
  },
  { timestamps: true }
);

export const PrivacyPolicy = mongoose.model(
  "PrivacyPolicy",
  PrivacyPolicySchema
);
