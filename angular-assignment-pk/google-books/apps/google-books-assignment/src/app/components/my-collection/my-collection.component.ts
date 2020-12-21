import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
})
export class MyCollectionComponent implements OnInit {
  constructor(public shared: SharedService) {}

  ngOnInit(): void {}

  trackByBook(index, book) {
    return book.id;
  }
}
