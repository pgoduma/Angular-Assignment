import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BookServiceService } from './book-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookModel } from '../models/book-model';
import { ApiKey } from '../keys/api-key';
import { HttpErrorResponse } from '@angular/common/http';

describe('BookServiceService', () => {
  let service: BookServiceService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(BookServiceService);
    mockHttp = TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    mockHttp.verify();
  });
  it('should should retrieve books from the Api via GET', () => {
    const dummyBooks: BookModel[] = [
      {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'},averageRating: 5, publisher:'publisher',pageCount:10,language:'en',billingName:'name',billingAddress:'address',billingEmail:'test@test.com','billingPhone':'9999999999'},
      {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'},averageRating: 5, publisher:'publisher',pageCount:10,language:'en',billingName:'name',billingAddress:'address',billingEmail:'test@test.com','billingPhone':'9999999999'},

    ];
    service.getBooks('test').subscribe((books)=>{
      if(books['items']){
        expect(books['items'].length).toBe(2);
        expect(books['items']).toEqual(dummyBooks);
      }
    });
    const request = mockHttp.expectOne(`${ApiKey.BOOKS_URL}?q=test`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBooks);
  });
  it('should should retrieve book details by book id', () => {
    const dummyBook: BookModel = {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'},averageRating: 5, publisher:'publisher',pageCount:10,language:'en',billingName:'name',billingAddress:'address',billingEmail:'test@test.com','billingPhone':'9999999999'};
    
    service.getBookById('123').subscribe((book)=>{
      if(book){
        expect(book).toEqual(dummyBook);
      }
    });
    const request = mockHttp.expectOne(`${ApiKey.BOOKS_URL}/123`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBook);
  });
  it('should check 404 error', fakeAsync(() => {
    const errorMsg = 'mock 404 error occured';
    service.getBooks('test').subscribe(
      (data) => {
        fail('Should have failed with 404 error')
      },
      (error: HttpErrorResponse) => {
        if(error){
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      }
    );
    const req = mockHttp.expectOne(`${ApiKey.BOOKS_URL}?q=test`);
    req.flush(errorMsg, { status: 404, statusText: 'Not Found' });
    tick();
  }));
});
