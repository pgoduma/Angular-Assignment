import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BookComponent } from './book.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BookComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check hasRoute matches given url', fakeAsync(()=>{
    spyOn(component, 'hasRoute').and.callThrough();
    component.hasRoute('cart');
    let spy = spyOnProperty(router, 'url', 'get').and.returnValue('billing-details/cart/12323');
    spy();
    tick();
    fixture.detectChanges();
    expect(component.hasRoute).toHaveBeenCalledWith('cart');
    expect(spy).toHaveBeenCalled();
    expect(spy().includes('cart')).toBeTruthy();
  }));
  it('Should check trackByAuthor is called', fakeAsync(()=>{
    spyOn(component, 'trackByAuthor').and.callThrough();
    component.trackByAuthor('xyz');
    tick();
    fixture.detectChanges();
    expect(component.trackByAuthor).toHaveBeenCalledWith('xyz');
    expect(component.trackByAuthor('xyz')).toEqual('xyz');
  }));

});
