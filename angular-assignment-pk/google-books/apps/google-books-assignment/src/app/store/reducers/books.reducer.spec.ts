import * as fromReducer from './books.reducer';
import * as fromActions from '../actions/books.actions';
import { BooksState } from '../../models/app-state.model';
import { BillingDetails } from '../../models/billing-details-model';
const payloadArr = [
  {
    id: '1',
    title: 'title 1',
    subtitle: 'subtitle 1',
    description: 'des 1',
    authors: ['name'],
    imageLinks: { smallThumbnail: 'smallthumbnail', thumbnail: 'thumbnail' },
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
const payload = {
  id: '1',
  title: 'title 1',
  subtitle: 'subtitle 1',
  description: 'des 1',
  authors: ['name'],
  imageLinks: { smallThumbnail: 'smallthumbnail', thumbnail: 'thumbnail' },
  averageRating: 5,
  publisher: 'publisher',
  pageCount: 10,
  language: 'en',
  billingName: 'name',
  billingAddress: 'address',
  billingEmail: 'test@test.com',
  billingPhone: '9999999999',
};
describe('Books Reducer', () => {
  describe('unmatched action', () => {
    it('should return default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.BooksReducer(
        initialState,
        action as fromActions.BookActions
      );

      expect(state).toBe(initialState);
    });
  });
  describe('LoadBooks action', () => {
     it('should update the search query and recent searches', () => {
      const { initialState } = fromReducer;
      const newState: BooksState = {
        booksList: [],
        cartItems: [],
        myCollectionItems: [],
        searchQuery: 'ngbook',
        recentSearches: ['ngbook'],
        billingDetails: [],
      };
      const action = new fromActions.LoadBooks('ngbook');
      const state = fromReducer.BooksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('LoadBooksSuccess action', () => {
     it('should load all books and update the state', () => {
      const { initialState } = fromReducer;
      const newState: BooksState = {
        booksList: [
          payload
        ],
        cartItems: [],
        myCollectionItems: [],
        searchQuery: '',
        recentSearches: [],
        billingDetails: [],
      };
      const action = new fromActions.LoadBooksSuccess(payloadArr);
      const state = fromReducer.BooksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('addTocart action', () => {
     it('should add book to cart and update the state', () => {
      const { initialState } = fromReducer;
      const newState: BooksState = {
        booksList: [],
        cartItems: [
          payload
        ],
        myCollectionItems: [],
        searchQuery: '',
        recentSearches: [],
        billingDetails: [],
      };
      const action = new fromActions.AddToCart(payload);
      const state = fromReducer.BooksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('remTocart action', () => {
     it('should remove book from cart and update the state', () => {
    //   const { initialState } = fromReducer;
      const initialState: BooksState = {
        booksList: [],
        cartItems: [
          payload
        ],
        myCollectionItems: [],
        searchQuery: '',
        recentSearches: [],
        billingDetails: [],
      };
      const newState: BooksState = {
        booksList: [],
        cartItems: [],
        myCollectionItems: [],
        searchQuery: '',
        recentSearches: [],
        billingDetails: [],
      };
      const action = new fromActions.RemFromCart(payload);
      const state = fromReducer.BooksReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('addToMycollection action', () => {
    it('should add book to mycollection and update the state', () => {
     const { initialState } = fromReducer;
     const billingDetails: BillingDetails = {
         id: '1',
         name: 'name',
         email: 'test@test.com',
         phone: '9999999999',
         address: 'address'
     }
     const newState: BooksState = {
       booksList: [],
       cartItems: [],
       myCollectionItems: [payload],
       searchQuery: '',
       recentSearches: [],
       billingDetails: [billingDetails],
     };
     const action = new fromActions.AddToMyCollection(payload);
     const state = fromReducer.BooksReducer(initialState, action);

     expect(state).toEqual(newState);
     expect(state).not.toBe(newState);
   });
 });
});
