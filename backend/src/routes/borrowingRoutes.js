const express = require('express');
const router = express.Router();
const BorrowingController = require('../controllers/BorrowingController');
const { authenticate } = require('../middleware/auth');
const { renewValidator, payFineValidator } = require('../validators/validators');

// Protected Routes
router.post('/checkout', authenticate, BorrowingController.checkout);
router.post('/return', authenticate, BorrowingController.returnBook);
router.get('/my-books', authenticate, BorrowingController.getActiveBooks);
router.get('/history', authenticate, BorrowingController.getHistory);

// New endpoints
router.post('/renew', authenticate, renewValidator, BorrowingController.renewBook);
router.post('/:borrowId/pay-fine', authenticate, payFineValidator, BorrowingController.payFine);

module.exports = router;
