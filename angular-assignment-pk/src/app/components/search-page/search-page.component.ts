import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookServiceService } from 'src/app/service/book-service.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BookModel } from 'src/app/models/book-model';

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
  constructor(private bookService: BookServiceService) { 
    this.booksArr = [];
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
    })
}
getBooksList(query): void{
  this.bookService.getBooks(query).subscribe((books:BookModel[])=>{
    this.booksArr = books.map(book=>new BookModel(book));
    this.loading = false;
    console.log(this.booksArr);
  })
}
trackByBook(index, book){
  return book.id
}
trackByAuthor(index, author){
  return author
}
}
