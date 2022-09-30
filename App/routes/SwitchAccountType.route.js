import express from 'express';
import { getAccountByCategory, getListings, resetAccountTypeToUser, switchAccountTypeToBusiness, switchAccountTypeToCreator, getAccountDetails } from '../controllers/SwitchAccountType.controller.js';
const SwitchAccountTypeRoutes = express.Router();

SwitchAccountTypeRoutes.route('/switchAccountTypeToBusiness').post(switchAccountTypeToBusiness);
SwitchAccountTypeRoutes.route('/switchAccountTypeToCreator').post(switchAccountTypeToCreator);

SwitchAccountTypeRoutes.route('/resetAccountTypeToUser').post(resetAccountTypeToUser);

SwitchAccountTypeRoutes.route('/switchAccountType/accountByCategories').get(getAccountByCategory);
SwitchAccountTypeRoutes.route('/switchAccountType/listings').get(getListings);
SwitchAccountTypeRoutes.route('/switchAccountType/details').get(getAccountDetails)


export default SwitchAccountTypeRoutes;
