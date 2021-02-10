import { Book } from '../../../../../libs/shared/models/src/lib/models';
import { BillingDetails } from "./billing-details-model";

export interface BooksState {
    booksList: Book[];
    cartItems: Book[];
    myCollectionItems: Book[];
    searchQuery: string;
    recentSearches: string[];
    billingDetails: BillingDetails[];
}


export interface AppState {
    readonly books: BooksState,
}