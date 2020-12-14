import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/service/book-service.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BookModel } from 'src/app/models/book-model';
import { SharedService } from 'src/app/service/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  loading: boolean = false;
  @ViewChild('inputQuery') inputQuery: ElementRef;
  booksArr:BookModel[];
  searchFieldInput: FormControl =  new FormControl('');
  constructor(private bookService: BookServiceService, private router: Router, private shared: SharedService, private snackBar: MatSnackBar) { 
    this.booksArr = this.shared.booksData?this.shared.booksData:[];
  }
  ngOnInit(): void {
    this.searchFieldInput.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((text: any)=>{
      let searchQuery = text.replace(/\s/g, "");
      if(searchQuery.length >= 2){
        this.getBooksList(searchQuery);
        this.loading = true;
      }
    });
}
getBooksList(query): void{  //get books list
  this.bookService.getBooks(query).subscribe((books:BookModel[])=>{
    this.booksArr = books.map(book=>new BookModel(book));
    this.shared.booksData = this.booksArr;
    this.loading = false;
    console.log(this.booksArr);
  },error=>{
    console.log(error);
    this.snackBar.open('Error retrieving books, Please try again', '', {
      duration: 2000,
    });
    this.loading = false;
  });
}
trackByBook(index, book){
  return book.id
}
trackByAuthor(index, author){
  return author
}
gotoBookDetail(id:string): void{ //go to selected book
  this.router.navigate(['book-details', id])
}
}
