import { TestBed } from '@angular/core/testing';

import { BookServiceService } from './book-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookModel } from '../models/book-model';
import { ApiKey } from '../keys/api-key';

describe('BookServiceService', () => {
  let service: BookServiceService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(BookServiceService);
    mockHttp = TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    mockHttp.verify();
  });
  it('should should retrieve books from the Api via GET', () => {
    const dummyBooks: BookModel[] = [
      {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'}},
      {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'}},
    ];
    service.getBooks('test').subscribe((books)=>{
      expect(books['items'].length).toBe(2);
      expect(books['items']).toEqual(dummyBooks);
    });
    const request = mockHttp.expectOne(`${ApiKey.BOOKS_URL}?q=test`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBooks);
  });
});
