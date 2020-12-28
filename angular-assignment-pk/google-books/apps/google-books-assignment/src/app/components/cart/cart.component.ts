import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../../models/book-model';
import { SharedService } from '../../service/shared.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  actionInfo: string;
  constructor(private router: Router, public shared: SharedService) {
  }

  ngOnInit(): void {
  }

  removeBook(book: BookModel) {
      this.shared.cartItems = this.shared.cartItems.filter(
        (item: BookModel) => item.id !== book.id
      );
  }

  proceedToBuy() {
    this.router.navigate(['billing-details', 'cart', '']);
  }

  trackByBook(book) {
    return book.id;
  }
}
