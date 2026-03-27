const BorrowingModel = require('../models/BorrowingModel');
const BookModel = require('../models/BookModel');
const NotificationService = require('./NotificationService');
const ReservationModel = require('../models/ReservationModel');
const { NotFoundError, ValidationError } = require('../exceptions/AppError');
const { MAX_BORROW_DAYS, MAX_RENEWALS } = require('../constants/appConstants');
const pool = require('../config/database');

class BorrowingService {
  static async checkoutBook(userId, bookId) {
    // Verify book exists
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw new NotFoundError('Book not found');
    }

    if (book.available_copies <= 0) {
      throw new Error('No copies available');
    }

    const borrowId = await BorrowingModel.checkout(userId, bookId);
    return borrowId;
  }

  static async returnBook(borrowId, userId) {
    const fine = await BorrowingModel.returnBook(borrowId, userId);
    return fine;
  }

  static async getActiveBooks(userId) {
    const books = await BorrowingModel.getActiveBooks(userId);
    return books;
  }

  static async getHistory(userId, page, limit) {
    const offset = (page - 1) * limit;
    const result = await BorrowingModel.getHistory(userId, limit, offset);
    return result;
  }

  // Renew book - extend due date
  static async renewBook(borrowId, userId) {
    try {
      // Get borrowing record
      const [borrowing] = await pool.query(
        `SELECT br.*, b.title FROM borrowing_records br
         JOIN books b ON br.book_id = b.book_id
         WHERE br.borrow_id = ? AND br.user_id = ?`,
        [borrowId, userId]
      );

      if (borrowing.length === 0) {
        throw new NotFoundError('Borrowing record not found');
      }

      const record = borrowing[0];

      // Validate status
      if (record.status !== 'active') {
        throw new ValidationError('Can only renew active borrowings');
      }

      // Check if overdue
      const today = new Date();
      if (new Date(record.due_date) < today) {
        throw new ValidationError('Cannot renew overdue books. Please return and pay fines first.');
      }

      // Check if book is reserved
      const [reservations] = await pool.query(
        'SELECT * FROM reservations WHERE book_id = ? AND status IN ("pending", "ready")',
        [record.book_id]
      );

      if (reservations.length > 0) {
        throw new ValidationError('Cannot renew - book has pending reservations');
      }

      // Check renewal count
      if (record.renewals_count >= MAX_RENEWALS) {
        throw new ValidationError(`Maximum ${MAX_RENEWALS} renewals reached`);
      }

      // Calculate new due date
      const newDueDate = new Date();
      newDueDate.setDate(newDueDate.getDate() + MAX_BORROW_DAYS);

      // Update borrowing record
      await pool.query(
        'UPDATE borrowing_records SET due_date = ?, renewals_count = renewals_count + 1 WHERE borrow_id = ?',
        [newDueDate, borrowId]
      );

      // Create notification
      await NotificationService.createNotification(
        userId,
        'renewal',
        'Book Renewed',
        `Your book "${record.title}" has been renewed. New due date: ${newDueDate.toDateString()}`
      );

      return { newDueDate };
    } catch (error) {
      throw error;
    }
  }

  // Pay fine for overdue book
  static async payFine(borrowId, userId, amount) {
    try {
      // Get borrowing record with fine info
      const [borrowing] = await pool.query(
        `SELECT br.*, u.email, b.title FROM borrowing_records br
         JOIN users u ON br.user_id = u.user_id
         JOIN books b ON br.book_id = b.book_id
         WHERE br.borrow_id = ? AND br.user_id = ?`,
        [borrowId, userId]
      );

      if (borrowing.length === 0) {
        throw new NotFoundError('Borrowing record not found');
      }

      const record = borrowing[0];

      // Validate amount
      if (amount <= 0) {
        throw new ValidationError('Amount must be greater than 0');
      }

      if (amount > record.fine_amount) {
        throw new ValidationError(`Fine amount is ${record.fine_amount}. Cannot pay more than owed.`);
      }

      // Update fine amount
      const remainingFine = record.fine_amount - amount;
      await pool.query('UPDATE borrowing_records SET fine_amount = ? WHERE borrow_id = ?', [remainingFine, borrowId]);

      // Record payment
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const [paymentResult] = await pool.query(
        'INSERT INTO fine_payments (borrow_id, amount, transaction_id, payment_date) VALUES (?, ?, ?, NOW())',
        [borrowId, amount, transactionId]
      );

      // Create notification
      await NotificationService.createNotification(
        userId,
        'payment',
        'Fine Paid',
        `Payment of ${amount} received for "${record.title}". Remaining fine: ${remainingFine}`
      );

      return {
        transactionId,
        amountPaid: amount,
        remainingFine,
        paidDate: new Date().toISOString(),
        receipt: {
          bookTitle: record.title,
          amountPaid: amount,
          remainingFine,
          transactionId,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BorrowingService;
