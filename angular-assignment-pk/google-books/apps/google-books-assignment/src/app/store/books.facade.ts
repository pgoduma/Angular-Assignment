import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../models/app-state.model';
import { Book } from '../../../../../libs/shared/models/src/lib/models';
import * as bookActions from './actions/books.actions';
import { booksList, cartItemsList, myCollectionItemsList } from './selectors/books.selector';

@Injectable({
    providedIn:'root'
})
export class BooksFacade {
  booksList$      = this.store.select(booksList);
  cartItemsList$ = this.store.select(cartItemsList);
  myCollectionItemsList$ = this.store.select(myCollectionItemsList);

  constructor(private store: Store<AppState>) {}

  loadBooks(query:string) {
    this.store.dispatch(new bookActions.LoadBooks(query));
  }
  addToCart(book:Book) {
    this.store.dispatch(new bookActions.AddToCart(book));
  }
  remFromCart(book:Book) {
    this.store.dispatch(new bookActions.RemFromCart(book));
  }
  addToMyCollection(book:Book) {
    this.store.dispatch(new bookActions.AddToMyCollection(book));
  }
}
