const cloudinary = require('cloudinary').v2;

try {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary configured successfully.");
} catch (error) {
  console.error("Error in Cloudinary configuration:", error.message);
}

module.exports = cloudinary;
