import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { BookServiceService } from 'src/app/service/book-service.service';
import { SharedService } from 'src/app/service/shared.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookId: string;
  book:BookModel;
  actionInfo: string;
  loading: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private shared: SharedService, private bookService: BookServiceService, private snackBar: MatSnackBar) { 
    this.route.params.subscribe(params => {
      this.bookId = params.id;
    });
  }

  ngOnInit(): void {
    this.getBookDetails();
  }
  getBookDetails(){
    this.loading = true;
    this.bookService.getBookById(this.bookId).subscribe((book:BookModel)=>{
      this.book = new BookModel(book);
      this.loading = false;
      console.log(this.book);
    });
  }

  getActionInfo(actionInfo: string){
    this.actionInfo = actionInfo;
  }
  setAction(book:BookModel){
    if(this.actionInfo && this.actionInfo === 'addToCart'){ //add to cart
      if(!this.shared.cartItems.some(item=>item.id === book.id)){
        this.shared.cartItems.push(book);
        this.snackBar.open('Book successfully added to cart','', {
          duration: 2000,
        });
      }
    }
    if(this.actionInfo && this.actionInfo === 'buyNow'){ //buy now
      this.shared.billingBookData = [];
      this.shared.billingBookData.push(book);
      this.router.navigate(['billing-details', 'buy-now']);
    }
  }
}
