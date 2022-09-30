import axios from "axios";
import "dotenv/config";
import { SynergyImage } from "../models/SynergyImage.model.js";

const {
  SYNERGY_CHAT_API_URL,
  SYNERGY_ACCOUNT_EID,
  SYNERGY_API_KEY,
  SYNERGY_API_SECRET,
  SYNERGY_CHAT_CONTEXT,
} = process.env;

export const getChatClientToken = async (req, res) => {
  try {
    let { _id, name, handle, email, phoneNumber, countryCode, profileImage } = req.user;
    if (!_id) {
      throw new Error("invalid user id");
    }
    // uid
    const uid = _id.toString();
    // display name
    let displayName = name ? name.trim() : "";
    displayName = displayName ? displayName : handle;
    // profile pic
    let profilePic;
    if (profileImage) {
      const profileImageIdStr = profileImage.toString();
      const profileImageObj = await SynergyImage.findById(profileImageIdStr);
      if (profileImageObj) {
        profilePic = profileImageObj.secureUrl;
      }
    }
    // attrs
    const attrs = {
      profilePic,
      email,
      phoneNumber,
      countryCode,
    };
    // user data
    const userData = {
      accountEid: SYNERGY_ACCOUNT_EID,
      apiKey: SYNERGY_API_KEY,
      apiSecret: SYNERGY_API_SECRET,
      contextEid: SYNERGY_CHAT_CONTEXT,
      uid,
      displayName,
      attrs,
    };
    // url
    const base_url = SYNERGY_CHAT_API_URL;
    const url = `${base_url}/token`;
    // config
    const config = {
      method: "post",
      url,
      data: userData,
    };
    // response
    const response = await axios(config);
    if (response && response.data && response.data.token) {
      const token = response.data.token;
      const expiresIn = response.data.expiresIn;
      return res.status(200).json({
        status: true,
        token,
        expiresIn,
        contextEid: SYNERGY_CHAT_CONTEXT,
        uid,
        userData,
      });
    } else {
      throw new Error("invalid client chat token");
    }
  } catch (e) {
    console.error("getChatClientToken, catch block, error - ", e);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
