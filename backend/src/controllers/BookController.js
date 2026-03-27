const BookService = require('../services/BookService');
const { sendSuccess, sendPaginated, sendError } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../constants/appConstants');

class BookController {
  static async getBooks(req, res, next) {
    try {
      const page = parseInt(req.query.page) || DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
      
      const { books, total } = await BookService.getAllBooks(page, limit);
      sendPaginated(res, 'Books retrieved', books, page, limit, total);
    } catch (error) {
      next(error);
    }
  }

  static async searchBooks(req, res, next) {
    try {
      const { q } = req.query;
      const books = await BookService.searchBooks(q);
      sendSuccess(res, `Found ${books.length} results`, { books });
    } catch (error) {
      next(error);
    }
  }

  static async getBook(req, res, next) {
    try {
      const book = await BookService.getBookById(req.params.id);
      sendSuccess(res, 'Book retrieved', { book });
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req, res, next) {
    try {
      const bookId = await BookService.createBook(req.body);
      sendSuccess(res, 'Book added', { bookId }, 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
    try {
      await BookService.updateBook(req.params.id, req.body);
      sendSuccess(res, 'Book updated');
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      await BookService.deleteBook(req.params.id);
      sendSuccess(res, 'Book deleted');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
