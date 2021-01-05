import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../../models/book-model';
import { SharedService } from '../../service/shared.service';
import { Observable } from 'rxjs';
import { BooksFacade } from 'src/app/store/books.facade';

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
    public shared: SharedService,
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
