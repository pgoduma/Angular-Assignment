import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';

const selectBooks = (state: AppState) => state;

export const booksList = createSelector(
    selectBooks, (state: AppState) => state.books.booksList
);
export const cartItemsList = createSelector(
    selectBooks, (state: AppState) => state.books.cartItems
);
export const myCollectionItemsList = createSelector(
    selectBooks, (state: AppState) => state.books.myCollectionItems
);


