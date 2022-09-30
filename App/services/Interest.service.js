import { Interest } from '../models/Interest.model.js';

export const postInterest = async (interestData) => {
  try {
    const interest = new Interest(interestData);
    return await interest.save();
  } catch (error) {
    return error;
  }
};

export const getAllInterests = async () => {
  const interests = Interest.find();
  return await interests;
};

export const getInterestCount = async () => {
  try {
    const count = await Interest.find().count();
    return count;
  }catch(error){
    return null
  }

};
