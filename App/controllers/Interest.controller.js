import { getAllInterests } from '../services/Interest.service.js';
import { defautlResponse, errorResponse } from '../../helper/utils.js';

export const allInterests = async (req, res) => {
  try {
    const interests = await getAllInterests();
    defautlResponse({ res, response: interests, message: "interestes found successfully" });
  } catch (err) {
    errorResponse({ res, message: err.message });
  }
};
