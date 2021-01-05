import * as Actions from './books.actions';

describe('Store > actions > Books Actions', () => {
    const payloadArr = [{
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
        }];
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
  it('SHOULD create a LoadData action', () => {
    const action = new Actions.LoadBooks('test');
    expect(action.type).toEqual(Actions.BookActionTypes.LOAD_BOOKS);
  });

  it('SHOULD create a loadBookSuccess action containing a payload arr', () => {
    const action = new Actions.LoadBooksSuccess(payloadArr);
    expect({ ...action }).toEqual({
      type: Actions.BookActionTypes.LOAD_BOOKS_SUCCESS,
      payload: payloadArr
    });
  });
  it('SHOULD create a addtocart action containing a payload', () => {
    const action = new Actions.AddToCart(payload);
    expect({ ...action }).toEqual({
      type: Actions.BookActionTypes.ADD_BOOK_TO_CART,
      payload
    });
  });
  it('SHOULD create a remfromcart action containing a payload', () => {
    const action = new Actions.RemFromCart(payload);
    expect({ ...action }).toEqual({
      type: Actions.BookActionTypes.REM_BOOK_FROM_CART,
      payload
    });
  });
  it('SHOULD create a addToMyCollection action containing a payload', () => {
    const action = new Actions.AddToMyCollection(payload);
    expect({ ...action }).toEqual({
      type: Actions.BookActionTypes.ADD_TO_MY_COLLECTION,
      payload
    });
  });
});