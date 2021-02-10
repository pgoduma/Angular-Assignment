import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BooksEffects } from './books.effects';
import * as fromActions from '../actions/books.actions';
import { BookServiceService } from '../../service/book-service.service';
import { Book } from '../../../../../../libs/shared/models/src/lib/models';

describe('BooksEffect', () => {
  let actions$: Observable<Action>;
  let effects: BooksEffects;
  let mockBookService;

  beforeEach((() => {
    mockBookService = jasmine.createSpyObj(['getBooks']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        BooksEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: BookServiceService,
          useValue: mockBookService
        }
      ],
    });

    effects = TestBed.inject(BooksEffects)
  }));
  
  it('SHOULD dispatch LoadBooksSuccess action when LoadBooks action is dispatched', () => {
    const booksArr:Book[] = [
        {
          id: '1',
          title: 'title 1',
          subtitle: 'subtitle 1',
          description: 'des 1',
          authors: ['name'],
          smallThumbnail: 'smallthumbnail', 
          thumbnail: 'thumbnail' ,
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

    mockBookService.getBooks.and.returnValue(of(booksArr));

    actions$ = of({ type: fromActions.BookActionTypes.LOAD_BOOKS });

    effects.loadBooks$.subscribe(action => {
      expect(action.type).toBe(fromActions.BookActionTypes.LOAD_BOOKS_SUCCESS);
    });
  });
  it('SHOULD throw error', () => {

    mockBookService.getBooks.and.returnValue(of(throwError('Error')));

    actions$ = of({ type: fromActions.BookActionTypes.LOAD_BOOKS });

    effects.loadBooks$.subscribe(action => {
      expect(action.type).toBe(fromActions.BookActionTypes.LOAD_BOOKS_FAILURE);
    });
  });
});