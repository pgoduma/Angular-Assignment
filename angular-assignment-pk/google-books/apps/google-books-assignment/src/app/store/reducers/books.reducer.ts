import { BookModel } from '../../models/book-model';
import * as bookActions from '../actions/books.actions';
import { BillingDetails } from 'src/app/models/billing-details-model';
import { BooksState, initialState } from 'src/app/models/app-state.model';

export function BooksReducer(
  state: BooksState = initialState,
  action: bookActions.BookActions
) {
  switch (action.type) {
    case bookActions.BookActionTypes.LOAD_BOOKS:
      return {
        ...state,
        searchQuery: action.payload,
        recentSearches: [...state.recentSearches, action.payload],
      };
    case bookActions.BookActionTypes.LOAD_BOOKS_SUCCESS:
      return { ...state, booksList: [...action.payload] };
    case bookActions.BookActionTypes.ADD_BOOK_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case bookActions.BookActionTypes.REM_BOOK_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case bookActions.BookActionTypes.ADD_TO_MY_COLLECTION:
      return {
        ...state,
        myCollectionItems: [...state.myCollectionItems, action.payload],
        billingDetails: [
          ...state.billingDetails,
          {
            id: action.payload.id,
            name: action.payload.billingName,
            phone: action.payload.billingPhone,
            email: action.payload.billingEmail,
            address: action.payload.billingAddress,
          },
        ],
      };
    default:
      return state;
  }
}
