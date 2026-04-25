const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const UserController = require('../controllers/UserController');
const { authenticate, authorize } = require('../middleware/auth');
const { ROLES } = require('../constants/appConstants');

// Cloudinary configuration (Reuse same credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verify Cloudinary connection on startup
cloudinary.api.ping()
  .then(() => {
    console.log('✅ Cloudinary connected successfully (User Profiles)');
  })
  .catch((err) => {
    console.error('❌ Cloudinary connection failed (User Profiles):', err.message);
  });

const profileImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms_profiles',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: (req, file) => `user-${req.user?.user_id || 'anon'}-${Date.now()}`
  },
});

const uploadProfileImage = multer({
  storage: profileImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'));
    }
  }
});

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
  console.log('🚨 handleMulterError called');
  console.log('Multer error handler called:', err?.code || err?.message);
  
  if (err instanceof multer.MulterError) {
    console.warn('Multer error detected:', err.code, err.message);
    if (err.code === 'FILE_TOO_LARGE' || err.code === 'LIMIT_FILE_SIZE') {
      console.warn('File too large:', err.message);
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 5MB',
        code: 'FILE_TOO_LARGE'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error',
      code: err.code
    });
  } else if (err) {
    console.error('Upload error:', err.message);
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error'
    });
  }
  console.log('✅ No multer errors, continuing to next');
  next();
};

// Protected Routes
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, UserController.updateProfile);

// Log upload route hits BEFORE authentication
router.post('/profile/image', (req, res, next) => {
  console.log('🚀 UPLOAD ROUTE HIT! POST /profile/image');
  console.log('Headers:', req.headers);
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  next();
}, authenticate, 
  uploadProfileImage.single('profileImage'), 
  handleMulterError, 
  UserController.uploadProfileImage
);

// Admin & Librarian Routes
router.get('/', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUser);
router.delete('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), UserController.deleteUser);

module.exports = router;
