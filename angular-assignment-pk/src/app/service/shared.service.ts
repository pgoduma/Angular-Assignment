import { Injectable } from '@angular/core';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _booksData: BookModel[];
  public get booksData(): BookModel[] {
    return this._booksData;
  }
  public set booksData(value: BookModel[]) {
    this._booksData = value;
  }

  private _billingBookData: BookModel[] = [];
  public get billingBookData(): BookModel[] {
    return this._billingBookData;
  }
  public set billingBookData(value: BookModel[]) {
    this._billingBookData = value;
  }

  private _addedToCart: boolean = false;
  public get addedToCart(): boolean {
    return this._addedToCart;
  }
  public set addedToCart(value: boolean) {
    this._addedToCart = value;
  }

  private _cartItems: BookModel[] = [];
  public get cartItems(): BookModel[] {
    return this._cartItems;
  }
  public set cartItems(value: BookModel[]) {
    this._cartItems = value;
  }

  private _myCollectionItems: BookModel[] = [];
  public get myCollectionItems(): BookModel[] {
    return this._myCollectionItems;
  }
  public set myCollectionItems(value: BookModel[]) {
    this._myCollectionItems = value;
  }
}
