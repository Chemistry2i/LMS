const pool = require('../config/database');
const { DatabaseError } = require('../exceptions/AppError');

class BorrowingModel {
  static async checkout(userId, bookId) {
    try {
      // Get available copy
      const [copies] = await pool.query(
        'SELECT copy_id FROM book_copies WHERE book_id = ? AND status = "available" LIMIT 1',
        [bookId]
      );

      if (copies.length === 0) {
        throw new Error('No available copies');
      }

      const copyId = copies[0].copy_id;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      // Create borrowing record
      const [result] = await pool.query(
        'INSERT INTO borrowing_records (user_id, book_id, copy_id, due_date, status) VALUES (?, ?, ?, ?, ?)',
        [userId, bookId, copyId, dueDate.toISOString().split('T')[0], 'active']
      );

      // Update copy status
      await pool.query('UPDATE book_copies SET status = "borrowed" WHERE copy_id = ?', [copyId]);

      // Update available count
      await pool.query('UPDATE books SET available_copies = available_copies - 1 WHERE book_id = ?', [bookId]);

      return result.insertId;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async returnBook(borrowId, userId) {
    try {
      // Get borrowing record
      const [records] = await pool.query(
        'SELECT * FROM borrowing_records WHERE borrow_id = ? AND user_id = ?',
        [borrowId, userId]
      );

      if (records.length === 0) {
        throw new Error('Borrowing record not found');
      }

      const record = records[0];
      let fine = 0;

      // Calculate fine if overdue
      const today = new Date();
      const dueDate = new Date(record.due_date);
      if (today > dueDate) {
        const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
        fine = daysOverdue * 10;
      }

      // Update borrowing record
      await pool.query(
        'UPDATE borrowing_records SET return_date = ?, status = ?, fine_amount = ? WHERE borrow_id = ?',
        [today.toISOString().split('T')[0], 'returned', fine, borrowId]
      );

      // Update copy status
      await pool.query('UPDATE book_copies SET status = "available" WHERE copy_id = ?', [record.copy_id]);

      // Update available count
      await pool.query('UPDATE books SET available_copies = available_copies + 1 WHERE book_id = ?', [record.book_id]);

      return fine;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async getActiveBooks(userId) {
    try {
      const [records] = await pool.query(
        'SELECT br.*, b.title, b.author FROM borrowing_records br JOIN books b ON br.book_id = b.book_id WHERE br.user_id = ? AND br.status = "active"',
        [userId]
      );
      return records;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async getHistory(userId, limit, offset) {
    try {
      const [records] = await pool.query(
        'SELECT br.*, b.title, b.author FROM borrowing_records br JOIN books b ON br.book_id = b.book_id WHERE br.user_id = ? ORDER BY br.checkout_date DESC LIMIT ? OFFSET ?',
        [userId, limit, offset]
      );
      const [count] = await pool.query('SELECT COUNT(*) as total FROM borrowing_records WHERE user_id = ?', [userId]);
      return { records, total: count[0].total };
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }
}

module.exports = BorrowingModel;
