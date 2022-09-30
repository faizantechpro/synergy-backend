import mongoose from 'mongoose';

const  SpecialitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    }
  },
  { timestamps: true },
);

export const Speciality = mongoose.model('Speciality', SpecialitySchema);
