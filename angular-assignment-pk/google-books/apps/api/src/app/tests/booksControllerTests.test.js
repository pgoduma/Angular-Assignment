const should = require('should');
const sinon = require('sinon');
const bookController = require('../controller/booksController');

describe('Book Controller Tests', () => {
 describe('get Books', () => {
     it('should send list of books on get books', () => {
         const req = {
             query: 'javascript'
         }

         const res = {
             status: sinon.spy(),
             send: sinon.spy(),
             json: sinon.spy()
         }

         const controller = bookController();
         controller.getBooks(req, res)

         res.status.calledWith(200).should.equal(true);
     })
     it('should send 400 error for invalid query', () => {
         const req = {
             query: ''
         }

         const res = {
             status: sinon.spy(),
             send: sinon.spy(),
             json: sinon.spy()
         }

         const controller = bookController();
         controller.getBooks(req, res)

         res.status.calledWith(400).should.equal(true);
     })
 });
 describe('get Book by Id', () => {
     it('should send a book based on book id', () => {
         const req = {
             parmas: {
                 bookId: 'abc123'
             }
         }

         const res = {
             status: sinon.spy(),
             send: sinon.spy(),
             json: sinon.spy()
         }

         const controller = bookController();
         controller.getBookById(req, res)

         res.status.calledWith(200).should.equal(true);
     })
     it('should send 400 error for invalid book id', () => {
        const req = {
            parmas: {
                bookId: ''
            }
        }

        const res = {
            status: sinon.spy(),
            send: sinon.spy(),
            json: sinon.spy()
        }

        const controller = bookController();
        controller.getBooks(req, res)

        res.status.calledWith(400).should.equal(true);
    })
 });
});