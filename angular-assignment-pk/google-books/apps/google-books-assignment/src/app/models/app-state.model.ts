import { BookModel } from "./book-model";
import { BillingDetails } from "./billing-details-model";

export interface BooksState {
    booksList: BookModel[];
    cartItems: BookModel[];
    myCollectionItems: BookModel[];
    searchQuery: string;
    recentSearches: string[];
    billingDetails: BillingDetails[];
}


export interface AppState {
    readonly books: BooksState,
}