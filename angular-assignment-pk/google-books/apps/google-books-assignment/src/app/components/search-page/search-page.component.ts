import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from '../../service/book-service.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BookModel } from '../../models/book-model';
import { SharedService } from '../../service/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  loading: boolean = false;
  @ViewChild('inputQuery') inputQuery: ElementRef;
  booksArr: BookModel[];
  searchFieldInput: FormControl = new FormControl('');
  errMsg:string;
  constructor(
    private bookService: BookServiceService,
    private router: Router,
    public shared: SharedService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.searchFieldInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((text: any) => {
        let searchQuery = text.replace(/\s/g, '');
        if (searchQuery.length >= 2) {
          this.getBooksList(searchQuery);
          this.loading = true;
        }
      });
  }
  getBooksList(query): void {
    //get books list
    this.bookService.getBooks(query).subscribe(
      (books: BookModel[]) => {
        this.shared.booksData = books.map((book) => new BookModel(book['volumeInfo'], book.id));
        this.loading = false;
        console.log(this.shared.booksData);
      },
      (error) => {
        console.log(error);
        this.errMsg = 'Error retrieving books, Please try again';
        this.snackBar.open(this.errMsg, '', {
          duration: 2000,
        });
        this.loading = false;
      }
    );
  }
  trackByBook(book) {
    return book.id;
  }
  gotoBookDetail(id: string): void {
    //go to selected book
    this.router.navigate(['book-details', id]);
  }
}
