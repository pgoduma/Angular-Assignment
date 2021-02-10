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
 })
});