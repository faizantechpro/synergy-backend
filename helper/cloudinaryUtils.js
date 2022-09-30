import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

const cloudinaryAPIKey = process.env.cloudinary_API_KEY;
const cloudinaryAPISecret = process.env.cloudinary_API_SECRET;

cloudinary.config({
  cloud_name: 'dktnhmsjx',
  api_key: cloudinaryAPIKey,
  api_secret: cloudinaryAPISecret,
});

export const profileImage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'synergy/avatars',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    const originalname = file.originalname.split('.');
    cb(undefined, Date.now() + '-' + originalname[0]);
  },
});

export const videos = cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'synergy/materials',
    resource_type: 'auto',
    use_filename: true,
  },
  filename: function (req, file, cb) {
    cb(undefined, Date.now() + '-' + file.originalname);
  },
});

export const materials = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'synergy/materials',
  filename: function (req, file, cb) {
    cb(undefined, Date.now() + '-' + file.originalname);
  },
});

export const storeImage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'synergy/storeLogo',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    const originalname = file.originalname.split('.');
    cb(undefined, Date.now() + '-' + originalname[0]);
  },
});

export const ProductImages = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'synergy/productImages',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    const originalname = file.originalname.split('.');
    cb(undefined, Date.now() + '-' + originalname[0]);
  },
});

const cloudinaryUtils = {
  cloudinary: cloudinary,
  profileImage: profileImage,
  materials: materials,
  videos: videos,
  storeImage: storeImage
};

export default cloudinaryUtils;
