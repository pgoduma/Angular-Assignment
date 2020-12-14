import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book:BookModel;
  @Output() selectedBook = new EventEmitter<BookModel>();
  @Output() bookAction = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  selectBook(book:BookModel, action:string){
    this.bookAction.emit(action);
    this.selectedBook.emit(book);
  }

  hasRoute(route: string){
    return this.router.url.includes(route);
  }
}
