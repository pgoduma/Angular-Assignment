import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public media: MediaObserver, public shared: SharedService) { }

  ngOnInit(): void {
  }

}
