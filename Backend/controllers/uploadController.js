const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'recipes',
    format: file.mimetype.split('/')[1], // Get format dynamically
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });

const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image upload failed. No file received.' });
    }
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    console.error('Error in image upload:', error);
    res.status(500).json({ message: 'Image upload error.', error: error.message });
  }
};

module.exports = { upload, uploadImage };
