export const getRandomNumber = () => Math.floor(1000 + Math.random() * 900000);
export const whiteListUrls = [
  "/api/otp/sendCode",
  "/api/otp/verifyCode",
  "/api/user/checkUserName",
];

export const InterestList = [
  { name: "Food & Drink", type: "" },
  { name: "Beauty & Style", type: "" },
  { name: "Music", type: "" },
  { name: "Fitness & Health", type: "" },
  { name: "Vlogs", type: "" },
  { name: "Comedy", type: "" },
  { name: "Sports", type: "" },
  { name: "Entertainment Culture", type: "" },
  { name: "Science & Education", type: "" },
  { name: "Family", type: "" },
  { name: "Motivation & Advice", type: "" },
  { name: "Dance", type: "" },
  { name: "Travel", type: "" },
  { name: "Gaming", type: "" },
  { name: "Pets", type: "" },
  { name: "Auto & Vehicle", type: "" },
  { name: "DIY", type: "" },
  { name: "Art", type: "" },
  { name: "Anime & Comics", type: "" },
  { name: "Life Hacks", type: "" },
  { name: "Outdoors", type: "" },
  { name: "Oddly Satisfying", type: "" },
  { name: "Home & Garden", type: "" },
];

export const CategoryList = [
  { name: "Artist" },
  { name: "Musician/Band" },
  { name: "Blogger" },
  { name: "Clothing (Brand)" },
  { name: "Community" },
  { name: "Digital Creator" },
  { name: "Education" },
  { name: "Entrepreneur" },
  { name: "Health/Beauty" },
  { name: "Editor" },
  { name: "Writer" },
  { name: "Personal Blog" },
  { name: "Product/Service" },
  { name: "Gamer" },
  { name: "Restaurant" },
  { name: "Beauty, Cosmetic & Personal Care" },
  { name: "Grocery Store" },
  { name: "Photographer" },
  { name: "Shopping & Retail" },
  { name: "Video Creator" },
];

export const ProductCategoryList = [
  { name: "Grocery" },
  { name: "Mobiles" },
  { name: "Fashion" },
  { name: "Electronics" },
  { name: "Home" },
  { name: "Beauty" },
  { name: "Appliances" },
  { name: "Toys & Baby" },
  { name: "Furniture" },
  { name: "Nutrition" },
  { name: "Sports" },
];

export const IndustryList = [
  { name: "Online Shopping" },
  { name: "Sales Business" },
  { name: "Direct Selling" },
  { name: "Multi-level Marketing" },
  { name: "Small Business" },
  { name: "Work From Home" },
];
export const SpecialityList = [
  { name: "IT Services" },
  { name: "Business Solutions" },
  { name: "Consulting" },
  { name: "Designing" },
];

export const StoreCategoriesList = [
  { name: "Fashion" },
  { name: "Electronics" },
  { name: "Mobile" },
  { name: "Personal Care" },
  { name: "Application" },
  { name: "Toy & Baby" },
  { name: "Home Decoration" },
  { name: "Furniture" },
  { name: "Sports" },
  { name: "Nutrition" },
];

export const findHashtags = (searchText) => {
  const regexp = /(\s|^)\#\w\w+\b/gm;
  let result = searchText && searchText.match(regexp);
  if (result) {
    result = result.map((s) => s.trim());
    return result;
  } else {
    return false;
  }
};

export const defautlResponse = ({
  res,
  statusCode = 200,
  message = "",
  response = [],
}) => {
  console.log("response =>>", response);
  res.status(200).json({
    response,
    message,
    statusCode,
  });
};

export const errorResponse = ({
  res,
  statusCode = 500,
  message = "",
  response = [],
}) => {
  res.status(500).json({
    response,
    message,
    statusCode,
  });
};
