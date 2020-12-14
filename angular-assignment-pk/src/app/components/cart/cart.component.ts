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
  actionInfo: string;

  constructor(private router: Router, public shared: SharedService) {
    const cart = JSON.parse(sessionStorage.getItem('cartData'));
  }

  ngOnInit(): void {
  }

  getActionInfo(actionInfo: string){
    this.actionInfo = actionInfo;
  }

  removeBook(book:BookModel){  //remove from cart
    if(this.actionInfo && this.actionInfo === 'remFromCart'){
      this.shared.cartItems = this.shared.cartItems.filter((item:BookModel)=>item.id !== book.id);
    }
  }

  proceedToBuy(){ //proceed to billing page
    this.shared.billingBookData = [];
    this.shared.billingBookData = [...this.shared.cartItems];
    this.router.navigate(['billing-details', 'cart']);
  }

  trackByBook(index, book){
    return book.id
  }
}
