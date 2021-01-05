import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../../models/book-model';
import { BooksFacade } from '../../store/books.facade';
@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
})
export class MyCollectionComponent implements OnInit {
  myCollectionItems$: Observable<BookModel[]>
  constructor(private bookFacadeService: BooksFacade) {}

  ngOnInit(): void {
    this.myCollectionItems$ = this.bookFacadeService.myCollectionItemsList$;
  }

  trackByBook(book) {
    return book.id;
  }
}
