import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { Book } from '../../../../../../libs/shared/models/src/lib/models';
import { BooksFacade } from '../../store/books.facade';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cartItems$: Observable<Book[]>;
  myCollectionItems$: Observable<Book[]>;
  constructor(
     public media: MediaObserver, 
     private bookFacadeService: BooksFacade) {}

  ngOnInit(): void {
  this.cartItems$ = this.bookFacadeService.cartItemsList$;
   this.cartItems$.subscribe(res=>{
     console.log('cartItems', res);
   })
  this.myCollectionItems$ = this.bookFacadeService.myCollectionItemsList$
   this.myCollectionItems$.subscribe(res=>{
     console.log('mycollectionItems', res);
   })
  }
}
