import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { BookModel } from '../../models/book-model';
import { BooksFacade } from 'src/app/store/books.facade';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cartItems$: Observable<BookModel[]>;
  myCollectionItems$: Observable<BookModel[]>;
  constructor(
     public media: MediaObserver, 
     private bookFacadeService: BooksFacade) {}

  ngOnInit(): void {
  // this.cartItems$ = this.store.select(store=>store.books.cartItems);
  this.cartItems$ = this.bookFacadeService.cartItemsList$;
   this.cartItems$.subscribe(res=>{
     console.log('cartItems', res);
   })
  // this.myCollectionItems$ = this.store.select(store=>store.books.myCollectionItems);
  this.myCollectionItems$ = this.bookFacadeService.myCollectionItemsList$
   this.myCollectionItems$.subscribe(res=>{
     console.log('mycollectionItems', res);
   })
  }
}
