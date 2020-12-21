import { Injectable } from '@angular/core';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _booksData: BookModel[] = [];  //search page array of books
  public get booksData(): BookModel[] {
    return this._booksData;
  }
  public set booksData(value: BookModel[]) {
    this._booksData = value;
  }

  private _cartItems: BookModel[] = []; //cart page array of books
  public get cartItems(): BookModel[] {
    return this._cartItems;
  }
  public set cartItems(value: BookModel[]) {
    this._cartItems = value;
  }

  private _myCollectionItems: BookModel[] = []; //mycollection page array of books
  public get myCollectionItems(): BookModel[] {
    return this._myCollectionItems;
  }
  public set myCollectionItems(value: BookModel[]) {
    this._myCollectionItems = value;
  }
}
