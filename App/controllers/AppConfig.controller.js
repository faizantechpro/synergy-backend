import { AppConfig } from "../models/AppConfig.model.js";
import { User } from "../models/User.model.js";   

export const AppConfigurations = async (req, res) => {
  try {
    const me = req.user;
    let configs = await AppConfig.findOne({ user: me._id });

    console.log("configs isss", JSON.stringify(configs))
    const user = await User.findById(me._id);
    configs
      ? (configs.accountType = user.accountType)
      : (configs = {
          ...configs,
          accountType: user.accountType,
        });
    return res.status(200).json(configs);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
