const axios = require('axios');
const ApiError = require('../error/api-error');

const booksApi = 'https://www.googleapis.com/books/v1/volumes';
let booksArr;

function booksController() {
 function getBooks(req, res, next)  {
      console.log(req.query.q);
      if(!req.query.q){
        next(ApiError.badRequest('Invalid query'));
        return;
      }
      const url = `${booksApi}?q=${req.query.q}`;
      axios
        .get(url)
        .then((books) => {
          booksArr = books.data.items.map(book=>({
              id:book.id,
              title:book.volumeInfo?.title,
              subtitle:book.volumeInfo?.subtitle,
              description:book.volumeInfo?.description,
              authors:book.volumeInfo?.authors || [],
              smallThumbnail: book.volumeInfo?.imageLinks?.smallThumbnail,
              thumbnail: book.volumeInfo?.imageLinks?.thumbnail,
              averageRating:book.volumeInfo?.averageRating,
              publisher:book.volumeInfo?.publisher,
              pageCount:book.volumeInfo?.pageCount,
              language:book.volumeInfo?.language
          }));
          res.json(booksArr);
        })
        .catch((err) => {
          next(ApiError.internal(err));
        });
    }
    function getBookById (req, res, next) {
      console.log(req.params.bookId);
      if(!req.params.bookId){
        next(ApiError.badRequest('Invalid Id'));
        return;
      }
      const url = `${booksApi}/${req.params.bookId}`;
      axios
        .get(url)
        .then(book => {
          const selectedBook = {
              id:book.data.id,
              title:book.data.volumeInfo?.title,
              subtitle:book.data.volumeInfo?.subtitle,
              description:book.data.volumeInfo?.description,
              authors:book.data.volumeInfo?.authors || [],
              smallThumbnail: book.data.volumeInfo?.imageLinks?.smallThumbnail,
              thumbnail: book.data.volumeInfo?.imageLinks?.thumbnail,
              averageRating:book.data.volumeInfo?.averageRating,
              publisher:book.data.volumeInfo?.publisher,
              pageCount:book.data.volumeInfo?.pageCount,
              language:book.data.volumeInfo?.language
          }        
          res.json(selectedBook);
        })
        .catch((err) => {
          next(ApiError.internal(err));
        });
    }
    return { getBooks, getBookById }
}
module.exports = booksController;