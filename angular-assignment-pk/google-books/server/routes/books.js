const express = require('express');
const axios = require('axios');
const bookRouter = express.Router();

const booksApi = 'https://www.googleapis.com/books/v1/volumes';

bookRouter.route('/books')
    .get((req,res)=>{
        console.log(req.query.q);
        const url = `${booksApi}?q=${req.query.q}`;
        axios.get(url).then(books=>{
            res.json(books.data);
        })
        .catch(err => {
            if (err.response) {
             res.send(err.response);
            } else if (err.request) {
                res.send(err.request);
            } else {
                res.send(err);
            }
        });
    });
bookRouter.route('/books/:bookId')
.get((req,res)=>{
    console.log(req.params.bookId);
    const url = `${booksApi}/${req.params.bookId}`;
    axios.get(url).then(book=>{
        res.json(book.data);
    })
    .catch(err => {
        if (err.response) {
            res.send(err.response);
        } else if (err.request) {
            res.send(err.request);
        } else {
            res.send(err);
        }
    });
});

module.exports = bookRouter;