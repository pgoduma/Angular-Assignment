import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BookModel } from '../../models/book-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BooksFacade } from '../../store/books.facade';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  booksList$:Observable<BookModel[]>;
  loading: boolean = false;
  @ViewChild('inputQuery') inputQuery: ElementRef;
  booksArr: BookModel[];
  searchFieldInput: FormControl = new FormControl('');
  errMsg:string;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private bookFacadeService: BooksFacade
  ) {
    this.booksList$ = this.bookFacadeService.booksList$
  }
  ngOnInit(): void {
    this.searchFieldInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((text: any) => {
        let searchQuery = text.replace(/\s/g, '');
        if (searchQuery.length >= 2) {
          this.getBooksList(searchQuery);
        }
      });
  }
  getBooksList(query): void {
    //get books list
    this.bookFacadeService.loadBooks(query);
  }
  trackByBook(book) {
    return book.id;
  }
  gotoBookDetail(id: string): void {
    //go to selected book
    this.router.navigate(['book-details', id]);
  }
}
