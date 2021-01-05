import { Injectable } from '@angular/core';
import { BookServiceService } from 'src/app/service/book-service.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as bookActions from '../actions/books.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BookModel } from 'src/app/models/book-model';

@Injectable({ providedIn: 'root' })
export class BooksEffects {
  constructor(
    private bookService: BookServiceService,
    private actions$: Actions
  ) {}

  @Effect() loadBooks$ = this.actions$.pipe(
    ofType<bookActions.LoadBooks>(bookActions.BookActionTypes.LOAD_BOOKS),
    switchMap((action) => {
      console.log('in books effects', action);
      return this.bookService
        .getBooks(action.payload)
        .pipe(
          map(
            (data) =>
              new bookActions.LoadBooksSuccess(
                data.map((book) => new BookModel(book['volumeInfo'], book.id))
              )
          ),
          catchError(error=>{
            console.log(error);
            throw new Error(error);
          })
        );
    })
  );
}
