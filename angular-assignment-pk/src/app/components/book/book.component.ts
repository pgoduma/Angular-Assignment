import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { SharedService } from 'src/app/service/shared.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book:BookModel;
  @Output() addToCartEvt = new EventEmitter<BookModel>();
  @Output() removeBook = new EventEmitter<BookModel>();
  @Output() addToBilling = new EventEmitter<BookModel>();

  constructor(private router: Router, private shared: SharedService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  navigateToBilling(book:BookModel){ 
    this.addToBilling.emit(book);
  }
  
  addToCart(book:BookModel){ 
    this.addToCartEvt.emit(book);
  }

  removeFromCart(book:BookModel){
    this.removeBook.emit(book);
  }

  hasRoute(route: string){
    return this.router.url.includes(route);
  }
}
