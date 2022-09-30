import express from 'express';
import { createStore, editStore, getAllUserStoreByUserId, storeTimeline, getSingleStoreByStoreId, getAllStores, storeAction, AddStoreGeoLocation, GetFollowingStoresGeoLocation, storeCategoryMenu, storeSubCategoryMenu, storeDashboradTimeline, getStoreCategory, getFilterStoreByCategory, getPrivacyPolicy, setStoreTiming, getStoreTiming, updateStoreTiming, getNestedMenu, getMainFilter, addAddress, editAddress, getUserAddresses, selectAddress } from '../controllers/Store.controller.js';
const storeRoutes = express.Router();

storeRoutes.route('/store').get(getAllUserStoreByUserId);
storeRoutes.route('/allStore').get(getAllStores);
storeRoutes.route('/store/privacyPolicy').get(getPrivacyPolicy);
storeRoutes.route('/store/timeline').get(storeTimeline);
storeRoutes.route('/store/nestedMenu').get(getNestedMenu);
storeRoutes.route('/store/mainFilter').get(getMainFilter);
storeRoutes.route('/store/dashboardTimeline').get(storeDashboradTimeline);
storeRoutes.route('/store/categoryMenu').get(storeCategoryMenu);
storeRoutes.route('/store/create').post(createStore);
storeRoutes.route('/store/addresses').get(getUserAddresses);
storeRoutes.route('/store/followingGeoLocation/get').get(GetFollowingStoresGeoLocation);
storeRoutes.route('/store/address/create').post(addAddress);
storeRoutes.route('/store/selectAddress/:id').patch(selectAddress);
storeRoutes.route('/store/address/edit/:id').put(editAddress);
storeRoutes.route('/store/categories').get(getStoreCategory);
storeRoutes.route('/store/filterByCategories/:id').get(getFilterStoreByCategory);
storeRoutes.route('/store/setStoreTiming/:id').post(setStoreTiming);
storeRoutes.route('/store/updateStoreTiming/:id').put(updateStoreTiming);
storeRoutes.route('/store/getStoreTiming/:id').get(getStoreTiming);
storeRoutes.route('/store/subCategoryMenu/:id').get(storeSubCategoryMenu);
storeRoutes.route('/store/one/:id').get(getSingleStoreByStoreId);
storeRoutes.route('/store/edit/:id').put(editStore);
storeRoutes.route('/store/:id/changeStatus').post(storeAction);
storeRoutes.route('/store/:id/geoLocation/add').post(AddStoreGeoLocation);

export default storeRoutes;