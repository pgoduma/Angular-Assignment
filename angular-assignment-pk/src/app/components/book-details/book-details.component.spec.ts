import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookDetailsComponent } from './book-details.component';
import { BookServiceService } from 'src/app/service/book-service.service';
import { BookModel } from 'src/app/models/book-model';
import { of } from 'rxjs';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let service: BookServiceService;
  let data:BookModel = {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'},averageRating: 5, publisher:'publisher',pageCount:10,language:'en',billingName:'name',billingAddress:'address',billingEmail:'test@test.com','billingPhone':'9999999999'};
  beforeEach(() => {
      TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      declarations: [ BookDetailsComponent ],
      providers: [
        {
            provide: BookServiceService,
            useValue: {
              getBookById: () => of(data)
            }
        }
    ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BookServiceService)
    fixture.detectChanges();
  });

  it('should fetch the book by id', () => {
    spyOn(service, 'getBookById').and.callThrough();
    service.getBookById('123');
    fixture.detectChanges();
    expect(service.getBookById).toHaveBeenCalledWith('123');
});
});
