import { Action } from '@ngrx/store';
import { Book } from '../../../../../../libs/shared/models/src/lib/models';

export enum BookActionTypes {
  LOAD_BOOKS = '[Search] load Books by query',
  LOAD_BOOKS_SUCCESS = '[Search] load Books by query success',
  LOAD_BOOKS_FAILURE = '[Search] load Books by query failure',
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
  constructor(public payload: Book[]) {}
}
export class LoadBooksFailure implements Action {
  readonly type = BookActionTypes.LOAD_BOOKS_FAILURE;
  constructor(public payload: string) {}
}

export class AddToCart implements Action {
  readonly type = BookActionTypes.ADD_BOOK_TO_CART;
  constructor(public payload: Book) {}
}
export class RemFromCart implements Action {
  readonly type = BookActionTypes.REM_BOOK_FROM_CART;
  constructor(public payload: Book) {}
}
export class AddToMyCollection implements Action {
  readonly type = BookActionTypes.ADD_TO_MY_COLLECTION;
  constructor(public payload: Book) {}
}

export type BookActions =
  | LoadBooks
  | LoadBooksSuccess
  | AddToCart
  | RemFromCart
  | AddToMyCollection;
