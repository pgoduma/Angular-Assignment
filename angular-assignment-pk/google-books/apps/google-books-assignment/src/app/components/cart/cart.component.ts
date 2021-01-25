import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../../models/book-model';
import { Observable } from 'rxjs';
import { BooksFacade } from '../../store/books.facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  actionInfo: string;
  cartItems$: Observable<BookModel[]>;
  constructor(
    private router: Router,
    private bookFacadeService: BooksFacade
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.bookFacadeService.cartItemsList$;
  }

  removeBook(book: BookModel) {
    this.bookFacadeService.remFromCart(book);
  }

  proceedToBuy() {
    this.router.navigate(['billing-details', 'cart', '']);
  }

  trackByBook(book) {
    return book.id;
  }
}
