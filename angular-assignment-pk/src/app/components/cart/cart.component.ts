import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, public shared: SharedService) {
    const cart = JSON.parse(sessionStorage.getItem('cartData'));
  }

  ngOnInit(): void {
  }

  proceedToBuy(){
    this.shared.billingBookData = [...this.shared.cartItems];
    this.router.navigate(['billing-details']);
  }

  removeBook(book:BookModel){
    this.shared.cartItems = this.shared.cartItems.filter((item:BookModel)=>item.id !== book.id);
  }

  trackByBook(index, book){
    return book.id
  }
}
