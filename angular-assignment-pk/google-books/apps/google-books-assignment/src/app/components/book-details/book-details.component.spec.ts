import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookDetailsComponent } from './book-details.component';
import { BookServiceService } from '../../service/book-service.service';
import { SharedService } from '../../service/shared.service';
import { BookModel } from '../../models/book-model';
import { of } from 'rxjs';
import { Router, RouterOutlet, ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { BillingDetailsComponent } from '../billing-details/billing-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let service: BookServiceService;
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
  beforeEach(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
      ],
      declarations: [BookDetailsComponent],
      providers: [
        {
          provide: BookServiceService,
          useValue: {
            getBookById: () => of(data),
          },
        },
        {
          provide: SharedService
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BookServiceService);
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should fetch the book by id', () => {
    spyOn(service, 'getBookById').and.callThrough();
    service.getBookById('123');
    fixture.detectChanges();
    expect(service.getBookById).toHaveBeenCalledWith('123');
  });
  describe('addtocart', ()=>{
    it('should call addToCart when add to cart button clicked', () => {
      const ele = fixture.debugElement.nativeElement.querySelector(
        '#add-to-cart'
        );
      ele.click();
      spyOn(component, 'addToCart').and.callThrough();
      component.addToCart(data);
      fixture.detectChanges();
      expect(component.addToCart).toHaveBeenCalledWith(data);
    });
    it('should check if cartitems is already having the book', ()=>{
      const spy = spyOnProperty(sharedService, 'cartItems', 'get').and.returnValue([]);
      expect(sharedService.cartItems).toEqual([]); 
      expect(spy).toHaveBeenCalled();
      console.log(sharedService.cartItems);
      let itemExists = sharedService.cartItems.some(item=>item.id === data.id);
      expect(itemExists).toBeFalse();
    })
    it('should go to billing details page', () => {
      spyOn(component, 'buyNow').and.callThrough();
      component.buyNow(data);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/billing-details']);   
    });
  })
});
