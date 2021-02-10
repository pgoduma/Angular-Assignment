const booksController = require('../controller/booksController')
const controller = booksController();

export function bookRoutes(express) {
  const bookRouter = express.Router();

  bookRouter.route('/books').get(controller.getBooks);
  bookRouter.route('/books/:bookId').get(controller.getBookById);
  return bookRouter;
}