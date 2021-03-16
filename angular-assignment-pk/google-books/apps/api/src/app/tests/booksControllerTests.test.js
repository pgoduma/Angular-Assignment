const { expect } = require('chai');
const response = require('./mock-response');
const bookController = require('../controller/booksController');
const nock = require('nock');

describe('Book Controller Tests', () => {
  describe('get Books', () => {
    beforeEach(() => {
      const url = `/books/v1/volumes?q=ngbook`;
      const errUrl = `/books/v1/volumes?q=`;
      nock('https://www.googleapis.com').get(url).reply(200, [response]);
      nock('https://www.googleapis.com').get(errUrl).reply(400, {
        message: 'bad request',
        status: 400,
      });
    });

    it('should send list of books on get books', () => {
      const req = {
        query: {
          q: 'ngbook',
        },
      };
      const controller = bookController();
      const response = controller.getBooks(req);
      expect(typeof response).to.equal('array');
      expect(response.id).to.equal('1');
      expect(response.title).to.equal('title 1');
    });
    it('should send 400 error for invalid query', () => {
      const req = {
        query: {
          q: '',
        },
      };

      const controller = bookController();
      const response = controller.getBooks(req);
      expect(typeof response).to.equal('object');
      expect(response.status).to.equal(400);
    });
  });
  describe('get Book by Id', () => {
    beforeEach(() => {
      const url = `/books/v1/volumes/abc123`;
      const errUrl = `/books/v1/volumes/null`;
      nock('https://www.googleapis.com').get(url).reply(200, response);
      nock('https://www.googleapis.com').get(errUrl).reply(400, {
        message: 'bad request',
        status: 400,
      });
    });

    it('should send a book based on book id', () => {
      const req = {
        parmas: {
          bookId: abc123,
        },
      };
      const controller = bookController();
      const response = controller.getBooks(req);
      expect(typeof response).to.equal('array');
      expect(response.id).to.equal('1');
      expect(response.title).to.equal('title 1');
    });
    it('should send 400 error for invalid id', () => {
      const req = {
        parmas: {
          bookId: null,
        },
      };

      const controller = bookController();
      const response = controller.getBooks(req);
      expect(typeof response).to.equal('object');
      expect(response.status).to.equal(400);
    });
  });
});
