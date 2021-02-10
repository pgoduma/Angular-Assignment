import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../../../../../libs/shared/models/src/lib/models';
import { BooksFacade } from '../../store/books.facade';
@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
})
export class MyCollectionComponent implements OnInit {
  myCollectionItems$: Observable<Book[]>
  constructor(private bookFacadeService: BooksFacade) {}

  ngOnInit(): void {
    this.myCollectionItems$ = this.bookFacadeService.myCollectionItemsList$;
  }

  trackByBook(book) {
    return book.id;
  }
}
