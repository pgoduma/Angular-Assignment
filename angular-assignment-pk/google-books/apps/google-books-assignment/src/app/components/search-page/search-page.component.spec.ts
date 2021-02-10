import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookServiceService } from '../../service/book-service.service';
import { SearchPageComponent } from './search-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../../../../libs/shared/models/src/lib/models';
import { of, throwError } from 'rxjs';
import { BookComponent } from '../book/book.component';
import { Router, ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let mockBooksService;
  let books: Book[];
  let mockRouter;
  let mockActivatedRoute;
  beforeEach(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    mockActivatedRoute = {params:{id: 1}};
    books = [
      {
        id: '1',
        title: 'title 1',
        subtitle: 'subtitle 1',
        description: 'des 1',
        authors: ['name'],
        smallThumbnail: 'smallthumbnail',
        thumbnail: 'thumbnail',
        averageRating: 5,
        publisher: 'publisher',
        pageCount: 10,
        language: 'en',
        billingName: 'name',
        billingAddress: 'address',
        billingEmail: 'test@test.com',
        billingPhone: '9999999999',
      },
      {
        id: '1',
        title: 'title 1',
        subtitle: 'subtitle 1',
        description: 'des 1',
        authors: ['name'],
        smallThumbnail: 'smallthumbnail',
        thumbnail: 'thumbnail',
        averageRating: 5,
        publisher: 'publisher',
        pageCount: 10,
        language: 'en',
        billingName: 'name',
        billingAddress: 'address',
        billingEmail: 'test@test.com',
        billingPhone: '9999999999',
      },
    ];
    mockBooksService = jasmine.createSpyObj(['getBooks']);
    const initialState = {};
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
      ],
      declarations: [SearchPageComponent, BookComponent],
      providers: [
        { provide: BookServiceService, useValue: mockBooksService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideMockStore({ initialState }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    // myService = TestBed.inject(BookServiceService);
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getBooksList', () => {
    mockBooksService.getBooks.and.returnValue(of(books));
    const mySpy = spyOn(component, 'getBooksList').and.callThrough();
    // fixture.detectChanges();
    component.getBooksList('test');
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
  it('should display an error', () => {
    mockBooksService.getBooks.and.returnValue(throwError('Error'));
    spyOn(component, 'getBooksList').and.callThrough();
    component.getBooksList('test');
    expect(component.errMsg).toBe('Error retrieving books, Please try again');
    expect(component.loading).toBeFalsy();
  });
  it('Should check trackByBook is called', fakeAsync(() => {
    const dummyBook = {
      id: '1',
      title: 'title 1',
      subtitle: 'subtitle 1',
      description: 'des 1',
      authors: ['name'],
      imageLinks: { smallThumbnail: 'smallthumbnail', thumbnail: 'thumbnail' },
      averageRating: 5,
      publisher: 'publisher',
      pageCount: 10,
      language: 'en',
      billingName: 'name',
      billingAddress: 'address',
      billingEmail: 'test@test.com',
      billingPhone: '9999999999',
    };
    spyOn(component, 'trackByBook').and.callThrough();
    component.trackByBook(dummyBook);
    tick();
    fixture.detectChanges();
    expect(component.trackByBook).toHaveBeenCalledWith(dummyBook);
    expect(component.trackByBook(dummyBook)).toEqual(dummyBook.id);
  }));
  it('should navigate to book-details', () => {
    const dummyBook = {
      id: '1',
      title: 'title 1',
      subtitle: 'subtitle 1',
      description: 'des 1',
      authors: ['name'],
      imageLinks: { smallThumbnail: 'smallthumbnail', thumbnail: 'thumbnail' },
      averageRating: 5,
      publisher: 'publisher',
      pageCount: 10,
      language: 'en',
      billingName: 'name',
      billingAddress: 'address',
      billingEmail: 'test@test.com',
      billingPhone: '9999999999',
    };
    spyOn(component, 'gotoBookDetail').and.callThrough();
    component.gotoBookDetail(dummyBook.id);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
