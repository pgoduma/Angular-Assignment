import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../../../../../libs/shared/models/src/lib/models';
import { Observable } from 'rxjs';
import { BooksFacade } from '../../store/books.facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  actionInfo: string;
  cartItems$: Observable<Book[]>;
  constructor(
    private router: Router,
    private bookFacadeService: BooksFacade
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.bookFacadeService.cartItemsList$;
  }

  removeBook(book: Book) {
    this.bookFacadeService.remFromCart(book);
  }

  proceedToBuy() {
    this.router.navigate(['billing-details', 'cart', '']);
  }

  trackByBook(book) {
    return book.id;
  }
}
