const chai = require('chai');
const request = require('supertest');
const app = require('../../main');

describe('BookRoute', () => {
    describe('getBooks', ()=>{
        request(app)
            .get('/api/books')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '4')
            .expect(200, "ok")
            .end(function(err, res){
               if (err) throw err;
            });
    })
    describe('getBookById', ()=>{
        request(app)
            .get('/api/books/:bookId')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '4')
            .expect(200, "ok")
            .end(function(err, res){
               if (err) throw err;
            });
    })
});