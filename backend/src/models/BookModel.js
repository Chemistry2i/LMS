const pool = require('../config/database');
const { DatabaseError } = require('../exceptions/AppError');

class BookModel {
  static async findAll(limit, offset) {
    try {
      const [rows] = await pool.query(
        'SELECT b.*, c.category_name FROM books b LEFT JOIN categories c ON b.category_id = c.category_id LIMIT ? OFFSET ?',
        [limit, offset]
      );
      const [count] = await pool.query('SELECT COUNT(*) as total FROM books');
      return { books: rows, total: count[0].total };
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async findById(bookId) {
    try {
      const [rows] = await pool.query(
        'SELECT b.*, c.category_name FROM books b LEFT JOIN categories c ON b.category_id = c.category_id WHERE b.book_id = ?',
        [bookId]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async search(query) {
    try {
      const searchTerm = `%${query}%`;
      const [rows] = await pool.query(
        'SELECT b.*, c.category_name FROM books b LEFT JOIN categories c ON b.category_id = c.category_id WHERE b.title LIKE ? OR b.author LIKE ? OR b.isbn LIKE ? LIMIT 20',
        [searchTerm, searchTerm, searchTerm]
      );
      return rows;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async create(bookData) {
    try {
      const { title, author, isbn, category_id, publication_year, publisher, description, total_copies } = bookData;
      const [result] = await pool.query(
        'INSERT INTO books (title, author, isbn, category_id, publication_year, publisher, description, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, author, isbn, category_id, publication_year, publisher, description, total_copies, total_copies]
      );
      return result.insertId;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async update(bookId, updateData) {
    try {
      const { title, author, category_id, publication_year, publisher, description } = updateData;
      await pool.query(
        'UPDATE books SET title = ?, author = ?, category_id = ?, publication_year = ?, publisher = ?, description = ? WHERE book_id = ?',
        [title, author, category_id, publication_year, publisher, description, bookId]
      );
      return true;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async delete(bookId) {
    try {
      await pool.query('DELETE FROM books WHERE book_id = ?', [bookId]);
      return true;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }
}

module.exports = BookModel;
