import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../../models/book-model';
import { BookServiceService } from '../../service/book-service.service';
import { SharedService } from '../../service/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksFacade } from 'src/app/store/books.facade';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  bookId: string;
  book: BookModel;
  actionInfo: string;
  loading: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    private bookService: BookServiceService,
    private snackBar: MatSnackBar,
    private bookFacadeService: BooksFacade

  ) {
    this.route.params.subscribe((params) => {
      this.bookId = params.id;
    });
  }

  ngOnInit(): void {
    this.getBookDetails();
  }
  getBookDetails() {
    this.loading = true;
    this.bookService.getBookById(this.bookId).subscribe((book: BookModel) => {
      this.book = new BookModel(book['volumeInfo'], book.id);
      this.loading = false;
      console.log(this.book);
    });
  }

  addToCart(book: BookModel) {
        this.bookFacadeService.addToCart(book);
  }

  buyNow(book: BookModel){
    this.router.navigate(['billing-details', 'buy', book.id]);
  }
}
