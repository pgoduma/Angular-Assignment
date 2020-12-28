import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartComponent } from './cart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { BookModel } from '../../models/book-model';
import { ActivatedRoute, Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let sharedService: SharedService;
  let mockRouter;
  let data: BookModel = {
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

  beforeEach( () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
      TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      declarations: [ CartComponent ],
      providers: [{
        provide: SharedService
      },
      { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should remove book from cart', () => {
      spyOn(component, 'removeBook').and.callThrough();
      component.removeBook(data);
      const spy = spyOnProperty(sharedService, 'cartItems', 'get').and.returnValue([data]);
      spy();
      expect(spy).toHaveBeenCalled();
      let itemExists = sharedService.cartItems.filter(item=>item.id != data.id);
      expect(itemExists.length).toBe(0);
  })
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
  it('should go to billing details page', () => {
    spyOn(component, 'proceedToBuy').and.callThrough();
    component.proceedToBuy();
    expect(mockRouter.navigate).toHaveBeenCalled();   
  });
});
