import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BookServiceService } from 'src/app/service/book-service.service';

import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SearchPageComponent ],
      providers: [BookServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getBooksList and return []',fakeAsync(() => {
   let fixture = TestBed.createComponent(SearchPageComponent);
   let component = fixture.debugElement.componentInstance;
   let bookService = fixture.debugElement.injector.get(BookServiceService);
   let fApiCall = spyOn(bookService,"getBooks").and.callFake(()=>{
      return of([]).pipe(delay(300));
   })
   component.getBooksList();
   tick(300);
   expect(component.booksArr).toEqual([]);
  }));
});
