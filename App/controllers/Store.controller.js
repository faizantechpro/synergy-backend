import { sendFCMNotification } from "../../helper/sendNotification.js";
import { add } from "../../helper/discover.js";
import { defautlResponse, errorResponse } from "../../helper/utils.js";
import { Product } from "../models/Product.model.js";
import { ProductCategories } from "../models/ProductCategory.model.js";
import { Store } from "../models/Store.model.js";
import { Order } from "../models/Order.model.js";
import { StoreLogo } from "../models/StoreLogo.model.js";
import { AppConfig } from "../models/AppConfig.model.js";
import {
  possibleRelationshipStatusesMessages,
  RelationshipsMapping,
  RequestStatusMapping,
  StoreRelationshipStatus,
} from "../models/StoreRelationshipStatus.model.js";
import { saveNotification } from "../services/Notification.service.js";
import { getUserByIdService } from "../services/User.service.js";
import { StoreCategoryMenu } from "../models/StoreCategoryMenu.model.js";
import { StoreSubCategoryMenu } from "../models/StoreSubCategoryMenu.model.js";
import { fakeOrders } from "../../helper/order.js";
import { Address } from "../models/Address.model.js";
import { Cart } from "../models/Cart.model.js";
import { StoreCategory } from '../models/StoreCategory.model.js'
import { StoreTiming } from '../models/StoreTiming.model.js'
import { PrivacyPolicy } from '../models/PrivacyPolicy.model.js'
import { StoreNestedCategoryMenu } from '../models/StoreNestedCategoryMenu.model.js'
import { MainFilter } from '../../helper/mainFilter.js'

export const createStore = async (req, res) => {
  try {
    const me = req.user;
    const store = await Store.create({
      user: me._id,
      ...req.body,
    });

    await AppConfig.updateOne(
      { user: me._id },
      { isStoreCreated: true, $push: { stores: store._id } }
    );

    return defautlResponse({ res, response: store });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const editStore = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;

    // let storeLogoId = "";
    // const file = req.file;
    // if (file !== undefined || file !== null) {
    //   if (file) {
    //     const largeImageData = {
    //       url: file.url,
    //       secureUrl: file.secure_url,
    //       width: file.width,
    //       height: file.height,
    //     };
    //     const storeLogo = new StoreLogo(largeImageData);
    //     await storeLogo.save();

    //     storeLogoId = storeLogo._id;
    //   }
    // }
    // if (file === undefined || file === null) {
    //   const create_store = await Store.findOneAndUpdate(
    //     { _id: id },
    //     {
    //       storeLink,
    //       businessName,
    //       businessCategory,
    //       country,
    //       phoneNumber,
    //       email,
    //       address,
    //     },
    //     { new: true }
    //   );
    //   const store = await create_store.populate("storeLogo");
    //   return res.status(200).json(store);
    // } else {
    const store = await Store.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    // const store = await create_store.populate("storeLogo");
    return defautlResponse({ res, response: store });
    // }
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, error: err });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const me = req.user;
    const store = await Store.find();
    return defautlResponse({ res, response: store });
  } catch (err) {
    console.log('err', err)
    return errorResponse({ res, response: err })
  }
};
export const getAllUserStoreByUserId = async (req, res) => {
  try {
    const me = req.user;
    const store = await Store.find({ user: me._id });
    return defautlResponse({ res, response: store });
  } catch (err) {
    console.log('err', err)
    return errorResponse({ res, response: err })
  }
};

export const getSingleStoreByStoreId = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    const store = await Store.findOne({ _id: id });
    return defautlResponse({ res, response: store });
  } catch (err) {
    console.log('err', err)
    return errorResponse({ res, response: err })
  }
};

export const storeTimeline = async (req, res) => {
  try {
    const brands = await Store.find();

    const categories = await ProductCategories.find();

    const topDeals = await Product.find({
      discountedPrice: { $gt: 0 },
    }).populate(["content", "variants"]);

    const products = await Product.find().populate(["content", "variants"]);

    const finalObj = [
      {
        type: "banner",
        title: "Ads Slider",
        item: add,
      },
      {
        type: "tiles",
        title: "Shop By Category",
        item: categories,
      },
      {
        type: "brands-slider",
        title: "Shop By Brands",
        item: brands,
      },
      {
        type: "deal-grid",
        title: "Top Deals",
        item: topDeals,
      },
      {
        type: "card",
        title: "Top Selling Products",
        item: products,
      },
    ];
    return defautlResponse({ response: finalObj, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, response: err });
  }
};

export const storeDashboradTimeline = async (req, res) => {
  try {
    const PendingOrder = await Order.find({
      status: "pending",
    }).countDocuments();
    const AcceptedOrder = await Order.find({
      status: "accepted",
    }).countDocuments();
    const ShippedOrder = await Order.find({
      status: "shipped",
    }).countDocuments();
    // const products = await Order.find({}).limit(10);

    const finalObj = [
      {
        type: "tiles",
        item: [{ PendingOrder }, { AcceptedOrder }, { ShippedOrder }],
      },
      {
        type: "graph",
        item: [
          {
            type: "day",
            item: {
              data1: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
              data2: [1000, 500, 1230, 2000, 1700, 2100],
            },
          },
          {
            type: "week",
            item: {
              data1: ["Sun", "Mon", "Teu", "Wed", "Thur", "Fri", "Sat"],
              data2: [25000, 9000, 12030, 20000, 17000, 20100],
            },
          },
          {
            type: "month",
            item: {
              data1: [
                "Jun",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              data2: [
                90000, 70500, 50030, 60000, 67000, 75000, 700000, 60500, 80030,
                90000, 127000, 155000,
              ],
            },
          },
        ],
      },
      {
        type: "card",
        title: "Active Order",
        item: fakeOrders,
      },
    ];
    return defautlResponse({ response: finalObj, res });
  } catch (err) {
    console.error("err", err);
    return errorResponse({ res, response: err });
  }
};

export const storeAction = async (req, res) => {
  const { id } = req.params;
  let { requestStatus } = req.body;
  let me = req.user;

  try {
    let status = RelationshipsMapping.notFriends;
    StoreRelationshipStatus;
    if (requestStatus === RequestStatusMapping.follow) {
      await StoreRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        { status: RelationshipsMapping.following },
        { new: true, upsert: true }
      );
      // await UserProfileStats.findOneAndUpdate({ userId: me._id }, { $inc: { following: 1 } });
    } else if (requestStatus === RequestStatusMapping.unFollow) {
      await StoreRelationshipStatus.findOneAndUpdate(
        { me: me._id, them: id },
        { status: RelationshipsMapping.notFollowing },
        { new: true, upsert: true }
      );
      // await UserProfileStats.findOneAndUpdate({ userId: me._id }, { $inc: { followers: -1 } });
    } else {
      console.log("requestStatus", requestStatus);
    }

    const user = await getUserByIdService(me._id);

    const store = await Store.findById(id);

    const message = possibleRelationshipStatusesMessages(
      requestStatus,
      user.name,
      store.businessName
    );
    await Promise.all(
      user.fcm.map(async (item) => {
        await sendFCMNotification(item.token, {
          title: me.name,
          body: message,
        });
      })
    );

    const currentStatus = await StoreRelationshipStatus.findOne({
      me: me._id,
      them: id,
    })
      .lean()
      .exec();

    await saveNotification({
      title: "Notification",
      body: message,
      type: status,
      senderId: me._id,
      receiverId: id,
      status: currentStatus.status,
    });


    
    return defautlResponse({ res, response: message, message:message })
  } catch (err) {
    console.log('err', err)
    return errorResponse({ res, response: err })
  }
};

export const AddStoreGeoLocation = async (req, res) => {
  try {
    const { id } = req.params
    const { longitude, latitude } = req.body
    const location = { type: 'Point', coordinates: [longitude, latitude] }
    const store = await Store.findByIdAndUpdate(id, { location }, { new: true })
    
    return defautlResponse({ res, response: store })
  } catch (err) {
    console.log('err', err)
    return errorResponse({ res, response: err })
  }
};

export const GetFollowingStoresGeoLocation = async (req, res) => {
  try {
    const me = req.user;
    const { longitude, latitude } = req.body;
    const location = { type: "Point", coordinates: [longitude, latitude] };
    const followingStores = [];
    const stores = await StoreRelationshipStatus.find({
      me: me._id,
      status: RelationshipsMapping.following,
    });
    for (let i = 0; i < stores.length; i++) {
      followingStores.push(stores[i].them);
    }
    console.log(followingStores);
    const storeLocations = await Store.aggregate([
      {
        $geoNear: {
          near: location,
          minDistance: 2,
          distanceField: "dist.calculated",
          query: {
            _id: {
              $in: followingStores,
            },
          },
          spherical: true,
        },
      },
    ]);

    // const storeLocations = dummyL;

    return defautlResponse({ res, response: storeLocations })
  } catch (err) {
    console.log('err', err)
    return errorResponse({ res, response: err })
  }
};

export const storeCategoryMenu = async (req, res) => {
  try {
    const menu = await StoreCategoryMenu.find()
    return defautlResponse({ res, response: menu })
  } catch (err) {
    console.log('err', err)
    return errorResponse({ res, response: err })
  }
};

export const storeSubCategoryMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await StoreSubCategoryMenu.findOne({ menuFor: id });
    return defautlResponse({ res, response: menu.levels });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const addAddress = async (req, res) => {
  try {
    const me = req.user;
    const address = await Address.create({
      userId: me._id,
      ...req.body,
    });
    return defautlResponse({ res, response: address });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return defautlResponse({ res, response: address });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const getUserAddresses = async (req, res) => {
  try {
    const me = req.user;
    const address = await Address.find({ userId: me._id });
    return defautlResponse({ res, response: address });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const selectAddress = async (req, res) => {
  try {
    const me = req.user;
    const { id } = req.params;
    await Cart.findOneAndUpdate({ userId: me._id }, { address: id });
    return defautlResponse({ res, response: "address selected" });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const getStoreCategory = async (req, res) => {
  try {
    const category = await StoreCategory.find();
    return defautlResponse({ res, response: category });            
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}

export const getFilterStoreByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let stores = []
    if(id === "all"){
      stores = await Store.find();
    }else{
      stores = await Store.find({ categories: { $in: id } });
    }
    if(stores.length !== 0){
      return defautlResponse({ res, response: stores });
    }else{
      return defautlResponse({ res, response: stores, message: "No Store Found"});
    }
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}

export const getPrivacyPolicy = async (req, res)=>{
  try {
    const privacyPolicy = await PrivacyPolicy.findOne({});
    
    return defautlResponse({ res, response: privacyPolicy });
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}

export const setStoreTiming = async (req, res) =>{
  try {
    const { id } = req.params;
    const storeTiming = await StoreTiming.create({
      storeId: id,
      ...req.body
    });
    return defautlResponse({ res, response: storeTiming});
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}

export const updateStoreTiming = async (req, res) =>{
  try {
    const { id } = req.params;
    const storeTiming = await StoreTiming.findOneAndUpdate(
      { storeId: id },
      {
        ...req.body,
      },
      { new: true }
    );
    return defautlResponse({ res, response: storeTiming});
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}

export const getStoreTiming = async (req, res) =>{
  try {
    const { id } = req.params;
    const storeTiming = await StoreTiming.find({storeId: id})
    return defautlResponse({ res, response: storeTiming});
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}

export const getNestedMenu = async (req, res)=>{
  try {
    const menu = await StoreNestedCategoryMenu.findOne();
    return defautlResponse({ res, response: menu});
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}

export const getMainFilter = async (req, res)=>{
  try {
    return defautlResponse({ res, response: MainFilter});
  } catch (err) {
    console.log('err', err);
    return errorResponse({ res, response: err });
  }
}
