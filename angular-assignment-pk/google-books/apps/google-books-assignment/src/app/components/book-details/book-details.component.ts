import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../../../../libs/shared/models/src/lib/models';
import { BookServiceService } from '../../service/book-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksFacade } from '../../store/books.facade';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  bookId: string;
  book: Book;
  actionInfo: string;
  loading: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.bookService.getBookById(this.bookId).subscribe((book: Book) => {
      this.book = book;
      this.loading = false;
      console.log(this.book);
    });
  }

  addToCart(book: Book) {
        this.bookFacadeService.addToCart(book);
  }

  buyNow(book: Book){
    this.router.navigate(['billing-details', 'buy', book.id]);
  }
}
