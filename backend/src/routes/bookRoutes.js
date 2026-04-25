// ...existing code...
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verify Cloudinary connection on startup
cloudinary.api.ping()
  .then(() => {
    console.log('✅ Cloudinary connected successfully (Book Assets)');
  })
  .catch((err) => {
    console.error('❌ Cloudinary connection failed (Book Assets):', err.message);
  });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith('image/');
    return {
      folder: 'lms_books',
      // Use 'image' for covers, 'raw' for documents to ensure reliable downloads
      resource_type: isImage ? 'image' : 'raw',
      public_id: Date.now() + '-' + Math.round(Math.random() * 1E9)
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Example: 10MB limit for books
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain', 'application/epub+zip'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: Images, PDF, Word, Excel, PowerPoint, Text, and EPUB.'));
    }
  }
});


// Minimal test route for multer file upload debugging
router.post('/test-upload', upload.fields([
	{ name: 'cover', maxCount: 1 },
	{ name: 'book_file', maxCount: 1 }
]), (req, res) => {
	console.log('TEST req.files:', req.files);
	console.log('TEST req.body:', req.body);
	res.json({ files: req.files, body: req.body });
});
const { authenticate, authorize } = require('../middleware/auth');
const { bookValidator } = require('../validators/validators');
const { ROLES } = require('../constants/appConstants');

// Public Routes
router.get('/', BookController.getBooks);
router.get('/search', BookController.searchBooks);
router.get('/:id', BookController.getBook);

// Protected Routes (Librarian+)
router.post(
	'/',
	authenticate,
	authorize(ROLES.ADMIN, ROLES.LIBRARIAN),
	upload.fields([
		{ name: 'cover', maxCount: 1 },
		{ name: 'book_file', maxCount: 1 }
	]),
	bookValidator,
	BookController.createBook
);
router.put('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), bookValidator, BookController.updateBook);

// Protected Routes (Admin only)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN,ROLES.LIBRARIAN), BookController.deleteBook);

module.exports = router;
