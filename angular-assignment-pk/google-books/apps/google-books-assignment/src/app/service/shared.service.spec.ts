import { TestBed } from '@angular/core/testing';
import { BookModel } from '../models/book-model';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  const dummyBooks: BookModel[] = [
    {
      id: '1',
      title: 'title 1',
      subtitle: 'subtitle 1',
      description: 'des 1',
      authors: ['name'],
      imageLinks: {
        smallThumbnail: 'smallthumbnail',
        thumbnail: 'thumbnail',
      },
      averageRating: 5,
      publisher: 'publisher',
      pageCount: 10,
      language: 'en',
      billingName: 'name',
      billingAddress: 'address',
      billingEmail: 'test@test.com',
      billingPhone: '9999999999',
    },
  ];
  const books: BookModel[] = [
    {
      id: '1',
      title: 'title 1',
      subtitle: 'subtitle 1',
      description: 'des 1',
      authors: ['name'],
      imageLinks: {
        smallThumbnail: 'smallthumbnail',
        thumbnail: 'thumbnail',
      },
      averageRating: 5,
      publisher: 'publisher',
      pageCount: 10,
      language: 'en',
      billingName: 'name',
      billingAddress: 'address',
      billingEmail: 'test@test.com',
      billingPhone: '9999999999',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set booksdata', () => {
    let spy = spyOnProperty(service, 'booksData', 'set').and.callThrough();
    spy(dummyBooks);
    expect(books).toEqual(dummyBooks);
  });
  it('should set cartItems', () => {
    let spy = spyOnProperty(service, 'cartItems', 'set').and.callThrough();
    spy(dummyBooks);
    expect(books).toEqual(dummyBooks);
  });
  it('should set myCollectionItems', () => {
    let spy = spyOnProperty(service, 'myCollectionItems', 'set').and.callThrough();
    spy(dummyBooks);
    expect(books).toEqual(dummyBooks);
  });
});
