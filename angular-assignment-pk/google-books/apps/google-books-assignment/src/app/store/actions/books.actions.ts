import { Action } from '@ngrx/store';
import { BookModel } from '../../models/book-model';

export enum BookActionTypes {
  LOAD_BOOKS = '[Search] load Books by query',
  LOAD_BOOKS_SUCCESS = '[Search] load Books by query success',
  ADD_BOOK_TO_CART = '[CART] Add Book',
  REM_BOOK_FROM_CART = '[CART] Remove Book',
  ADD_TO_MY_COLLECTION = '[MYCOLLECTION] Add Book',
}
export class LoadBooks implements Action {
  readonly type = BookActionTypes.LOAD_BOOKS;
  constructor(public payload: string) {}
}

export class LoadBooksSuccess implements Action {
  readonly type = BookActionTypes.LOAD_BOOKS_SUCCESS;
  constructor(public payload: BookModel[]) {}
}

export class AddToCart implements Action {
  readonly type = BookActionTypes.ADD_BOOK_TO_CART;
  constructor(public payload: BookModel) {}
}
export class RemFromCart implements Action {
  readonly type = BookActionTypes.REM_BOOK_FROM_CART;
  constructor(public payload: BookModel) {}
}
export class AddToMyCollection implements Action {
  readonly type = BookActionTypes.ADD_TO_MY_COLLECTION;
  constructor(public payload: BookModel) {}
}

export type BookActions =
  | LoadBooks
  | LoadBooksSuccess
  | AddToCart
  | RemFromCart
  | AddToMyCollection;
