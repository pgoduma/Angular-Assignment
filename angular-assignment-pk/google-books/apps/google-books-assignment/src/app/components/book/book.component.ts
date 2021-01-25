import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../../models/book-model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() book: BookModel;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
  trackByAuthor(author:string){
    return author;
  }
}
