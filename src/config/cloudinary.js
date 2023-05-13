const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
  // cloud_name: process.env.CLOUD_NAME, 
  // api_key: process.env.API_KEY, 
  // api_secret: process.env.API_SECRET 
  cloud_name: 'multirtstore', 
  api_key: '733859918956672', 
  api_secret: 'ALCOPiqRRMPtusy-ZyH8yFQTrjI'
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'gif', 'jpeg'],
  params: () => { 
    return {
      folder: 'product'
    }
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud