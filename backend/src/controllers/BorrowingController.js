const BorrowingService = require('../services/BorrowingService');
const { sendSuccess, sendPaginated } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../constants/appConstants');

class BorrowingController {
  static async checkout(req, res, next) {
    try {
      const { bookId } = req.body;
      const borrowId = await BorrowingService.checkoutBook(req.user.userId, bookId);
      sendSuccess(res, 'Book checked out', { borrowId }, 201);
    } catch (error) {
      next(error);
    }
  }

  static async returnBook(req, res, next) {
    try {
      const { borrowId } = req.body;
      const fine = await BorrowingService.returnBook(borrowId, req.user.userId);
      sendSuccess(res, 'Book returned', { fine });
    } catch (error) {
      next(error);
    }
  }

  static async getActiveBooks(req, res, next) {
    try {
      const books = await BorrowingService.getActiveBooks(req.user.userId);
      sendSuccess(res, 'Active borrowings', { books });
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const page = parseInt(req.query.page) || DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
      
      const { records, total } = await BorrowingService.getHistory(req.user.userId, page, limit);
      sendPaginated(res, 'Borrowing history', records, page, limit, total);
    } catch (error) {
      next(error);
    }
  }

  // Renew book (extend due date)
  static async renewBook(req, res, next) {
    try {
      const { borrowId } = req.body;
      const userId = req.user.user_id;

      const result = await BorrowingService.renewBook(borrowId, userId);
      sendSuccess(res, 'Book renewed successfully', { newDueDate: result.newDueDate });
    } catch (error) {
      next(error);
    }
  }

  // Pay fine
  static async payFine(req, res, next) {
    try {
      const { borrowId } = req.params;
      const { amount } = req.body;
      const userId = req.user.user_id;

      const receipt = await BorrowingService.payFine(borrowId, userId, amount);
      sendSuccess(res, 'Fine paid successfully', { receipt }, 201);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BorrowingController;
