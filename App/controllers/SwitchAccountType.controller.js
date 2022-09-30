import { defautlResponse, errorResponse } from "../../helper/utils.js";
import {
  AccountTypeMapping,
  ActiveProfile,
} from "../models/ActiveProfile.model.js";
import { BusinessProfile } from "../models/BusinessProfile.model.js";
import { CreatorProfile } from "../models/CreatorProfile.model.js";
import { Industry } from "../models/Industry.model.js";
import { Speciality } from "../models/Speciality.model.js";
import { User } from "../models/User.model.js";

export const switchAccountTypeToBusiness = async (req, res) => {
  try {
    let me = req.user;

    const SwitchedAccount = await BusinessProfile.findOneAndUpdate(
      { userId: me._id },
      {
        userId: me._id,
        ...req.body,
      },
      { new: true, upsert: true }
    )
      .populate("categories")
      .populate("industry")
      .populate("specialities");

    await User.findOneAndUpdate(
      { _id: me._id },
      {
        accountType: AccountTypeMapping.business,
        switchedAccountInfo: SwitchedAccount._id,
      }
    );

    await ActiveProfile.findOneAndUpdate(
      { userId: me._id },
      { accountType: AccountTypeMapping.business },
      { new: true, upsert: true }
    );

    return defautlResponse({ response: SwitchedAccount, res });
  } catch (err) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const switchAccountTypeToCreator = async (req, res) => {
  try {
    let me = req.user;

    const SwitchedAccount = await CreatorProfile.findOneAndUpdate(
      { userId: me._id },
      {
        userId: me._id,
        ...req.body,
      },
      { new: true, upsert: true }
    )
      .populate("categories")
      .populate("industry")
      .populate("specialities");

    await User.findOneAndUpdate(
      { _id: me._id },
      {
        accountType: AccountTypeMapping.creater,
        switchedAccountInfo: SwitchedAccount._id,
      }
    );

    await ActiveProfile.findOneAndUpdate(
      { userId: me._id },
      { accountType: AccountTypeMapping.creater },
      { new: true, upsert: true }
    );

    return defautlResponse({ response: SwitchedAccount, res });
  } catch (err) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const getAccountByCategory = async (req, res) => {
  try {
    const me = req.user;
    const { categories } = req.body;
    var categoryAccounts;
    if (me.accountType === AccountTypeMapping.business) {
      categoryAccounts = await BusinessProfile.find({
        categories: { $in: categories },
      })
        .limit(20)
        .sort({ _id: -1 });
    }

    if (me.accountType === AccountTypeMapping.creater) {
      categoryAccounts = await CreatorProfile.find({
        categories: { $in: categories },
      })
        .limit(20)
        .sort({ _id: -1 });
    }

    return defautlResponse({ response: categoryAccounts, res });
  } catch (err) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const resetAccountTypeToUser = async (req, res) => {
  try {
    const me = req.user;

    if (me.accountType === AccountTypeMapping.business) {
      await BusinessProfile.findOneAndUpdate(
        { userId: me._id },
        { deActivate: true }
      );
    }

    if (me.accountType === AccountTypeMapping.creater) {
      await CreatorProfile.findOneAndUpdate(
        { userId: me._id },
        { deActivate: true }
      );
    }

    const user = await User.findOneAndUpdate(
      { _id: me._id },
      { accountType: AccountTypeMapping.user }
    );

    await ActiveProfile.findOneAndUpdate(
      { userId: me._id },
      { accountType: AccountTypeMapping.user }
    );

    return defautlResponse({ response: user, res });
  } catch (err) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const getListings = async (req, res) => {
  try {
    const specialities = await Speciality.find();
    const industry = await Industry.find();
    return defautlResponse({ response: { specialities, industry }, res });
  } catch (err) {
    console.error("err", err);
    errorResponse({ res, error: err });
  }
};

export const getAccountDetails = async (req, res) => {
  try {
    const me = req.user;
    const user = await User.findById(me._id).exec();

    if (user.accountType === AccountTypeMapping.business) {
      const businesprofile = await BusinessProfile.find({ userId: me._id })
        .populate([
          {
            path: "categories",
          },
          {
            path: "specialities",
          },
          {
            path: "industry",
          },
        ])
        .exec();
      return defautlResponse({ res, response: businesprofile });
    } else if (user.accountType === AccountTypeMapping.creater) {
      const businesprofile = await CreatorProfile.find({
        userId: me._id,
      }).exec();
      return defautlResponse({ res, response: businesprofile });
    } else {
      return defautlResponse({ res, response: user });
    }
  } catch (err) {
    return errorResponse({ res, response: err });
  }
};
