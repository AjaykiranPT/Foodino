
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your-folder-name', // Optional: specify folder in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'], // Optional: specify allowed formats
  },
});

// Create multer upload middleware
const upload = multer({ storage: storage });

const uploadImage = (req, res) => {
  if (req.file) {
    res.status(200).json({ url: req.file.path });
  } else {
    res.status(400).json({ message: 'Image upload failed' });
  }
};

module.exports = { upload, uploadImage };
