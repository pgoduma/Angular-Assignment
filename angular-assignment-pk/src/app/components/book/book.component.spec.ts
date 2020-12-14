import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BookComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected book', () => {
    const selectedBook = spyOn(component.selectedBook, 'emit');
    let bookModel = {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'},averageRating: 5, publisher:'publisher',pageCount:10,language:'en',billingName:'name',billingAddress:'address',billingEmail:'test@test.com','billingPhone':'9999999999'};
    component.selectBook(bookModel, 'Test');

    // Assert
    expect(selectedBook).toHaveBeenCalled();
    expect(selectedBook).toHaveBeenCalledWith(bookModel);
});
  it('should emit selected action', () => {
    const bookAction = spyOn(component.bookAction, 'emit');
    let bookModel = {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'},averageRating: 5, publisher:'publisher',pageCount:10,language:'en',billingName:'name',billingAddress:'address',billingEmail:'test@test.com','billingPhone':'9999999999'};
    component.selectBook(bookModel, 'test');

    // Assert
    expect(bookAction).toHaveBeenCalled();
    expect(bookAction).toHaveBeenCalledWith('test');
});
});
