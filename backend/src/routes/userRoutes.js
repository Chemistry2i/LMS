const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const UserController = require('../controllers/UserController');
const { authenticate, authorize } = require('../middleware/auth');
const { ROLES } = require('../constants/appConstants');

// Configure multer for profile image uploads
const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/profile-images'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.user.userId}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
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

// Protected Routes
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, UserController.updateProfile);
router.post('/profile/image', authenticate, uploadProfileImage.single('profileImage'), UserController.uploadProfileImage);

// Admin & Librarian Routes
router.get('/', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUser);
router.delete('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), UserController.deleteUser);

module.exports = router;
