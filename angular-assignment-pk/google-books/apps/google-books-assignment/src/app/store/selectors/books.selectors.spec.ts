import { AppState } from "../../models/app-state.model";
import * as allSelectors from "./books.selector";
const booksArr = [
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
const billingDetails = {
    id: '1',
    name: 'name',
    email: 'test@test.com',
    phone: '9999999999',
    address: 'address'
}
describe("Selectors", () => {
  const initialState: AppState = {
    books: 
        {
            booksList: booksArr,
            cartItems: booksArr,
            myCollectionItems: booksArr,
            searchQuery: '',
            recentSearches: ['ngbook'],
            billingDetails: [billingDetails],
        }
  };

  it("should select the booksList", () => {
      console.log('hello');
    const result = allSelectors.booksList.projector(initialState.books.booksList);
    expect(result).toBe(initialState.books.booksList);
    expect(result[0].id).toEqual("1");
  });

  it("should select the cartItemsList", () => {
    const result = allSelectors.cartItemsList.projector(
      initialState.books.cartItems
    );
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual("1");
  });
  it("should select the myCollectionItemsList", () => {
    const result = allSelectors.myCollectionItemsList.projector(
      initialState.books.myCollectionItems
    );
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual("1");
  });
});