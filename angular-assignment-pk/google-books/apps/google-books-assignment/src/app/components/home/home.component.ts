import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { SharedService } from '../../service/shared.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public media: MediaObserver, private shared: SharedService) {}

  ngOnInit(): void {}
  get CartItemsCount(){
    return this.shared.cartItems.length;
  }
  get myCollectionCount(){
    return this.shared.myCollectionItems.length;
  }
}
