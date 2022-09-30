import { Categories } from "./App/models/Category.model.js";
import { Industry } from "./App/models/Industry.model.js";
import { PrivacyPolicy } from "./App/models/PrivacyPolicy.model.js";
import { ProductCategories } from "./App/models/ProductCategory.model.js";
import { Speciality } from "./App/models/Speciality.model.js";
import { StoreCategory } from "./App/models/StoreCategory.model.js";
import { StoreCategoryMenu } from "./App/models/StoreCategoryMenu.model.js";
import { StoreNestedCategoryMenu } from "./App/models/StoreNestedCategoryMenu.model.js";
import { StoreSubCategoryMenu } from "./App/models/StoreSubCategoryMenu.model.js";
import {
  postInterest,
  getInterestCount,
} from "./App/services/Interest.service.js";
import { PrivacyPolicyData } from "./helper/PrivacyPolicy.js";
import {
  StoreCategoryMenuList,
  StoreNestedCategoryMenuList,
  StoreSubCategoryMenuList,
} from "./helper/storeUtils.js";
import {
  CategoryList,
  IndustryList,
  InterestList,
  ProductCategoryList,
  SpecialityList,
  StoreCategoriesList,
} from "./helper/utils.js";

const bootstrap = async () => {
  const interestCount = await getInterestCount();
  if (!interestCount || interestCount === 0) {
    await Promise.all(
      InterestList.map(async (interest) => {
        const interestData = await postInterest(interest);
        await interestData.save();
      })
    );
  }

  const categoriesCount = await Categories.find({}).countDocuments();
  if (categoriesCount === 0) {
    await Promise.all(
      CategoryList.map(async (categoriseData) => {
        const categories = new Categories(categoriseData);
        return await categories.save();
      })
    );
  }

  const productCategoriesCount = await ProductCategories.find(
    {}
  ).countDocuments();
  if (productCategoriesCount === 0) {
    await Promise.all(
      ProductCategoryList.map(async (categoriseData) => {
        const productCategories = new ProductCategories(categoriseData);
        return await productCategories.save();
      })
    );
  }

  const IndustryCount = await Industry.find({}).countDocuments();
  if (IndustryCount === 0) {
    await Promise.all(
      IndustryList.map(async (categoriseData) => {
        const industry = new Industry(categoriseData);
        return await industry.save();
      })
    );
  }

  const SpecialityCount = await Speciality.find({}).countDocuments();
  if (SpecialityCount === 0) {
    await Promise.all(
      SpecialityList.map(async (categoriseData) => {
        const speciality = new Speciality(categoriseData);
        return await speciality.save();
      })
    );
  }

  const StoreCategoryCount = await StoreCategory.find({}).countDocuments();
  if (StoreCategoryCount === 0) {
    await Promise.all(
      StoreCategoriesList.map(async (categoriseData) => {
        const storeCategory = new StoreCategory(categoriseData);
        return await storeCategory.save();
      })
    );
  }

  const StoreCategoryMenuCount = await StoreCategoryMenu.find(
    {}
  ).countDocuments();
  if (StoreCategoryMenuCount === 0) {
    await Promise.all(
      StoreCategoryMenuList.map(async (categoriseData, i) => {
        const storeCategoryMenu = new StoreCategoryMenu(categoriseData);
        await storeCategoryMenu.save();
        const storeSubCategoryMenu = new StoreSubCategoryMenu({
          menuFor: storeCategoryMenu._id,
          levels: StoreSubCategoryMenuList[i]?.levels,
        });
        await storeSubCategoryMenu.save();
      })
    );
  }

  const PrivacyPolicyCount = await PrivacyPolicy.find({}).countDocuments();
  if (PrivacyPolicyCount === 0) {
    await PrivacyPolicy.create({
      privacyPolicy: PrivacyPolicyData.privacyPolicy,
      definitions: PrivacyPolicyData.definitions,
      information: PrivacyPolicyData.information,
    });
  }

  const StoreNestedCategoryMenuCount =
    await StoreNestedCategoryMenu.find().countDocuments();
  if (StoreNestedCategoryMenuCount === 0) {
    await StoreNestedCategoryMenu.create({
      menu: StoreNestedCategoryMenuList,
    });
  }
};

export default bootstrap;
