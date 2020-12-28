import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { BillingDetailsComponent } from './billing-details.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BookModel } from '../../models/book-model';
describe('BillingDetailsComponent', () => {
  let component: BillingDetailsComponent;
  let fixture: ComponentFixture<BillingDetailsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockActivatedRoute;
  beforeEach( () => {
      mockActivatedRoute = {params: of({page:'buy', id: 1})};
      TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule],
      declarations: [ BillingDetailsComponent ],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDetailsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });
  it('Should check if "Your Name" field is valid',()=>{
    let name = component.billingDetails.controls['billingName'];
    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();
    expect(name.errors['required']).toBeTruthy();
    name.setValue('test')
    expect(name.errors).toBeNull();
  });
  it('Should check if "Your Address" field is valid',()=>{
    let address = component.billingDetails.controls['billingAddress'];
    expect(address.valid).toBeFalsy();
    expect(address.pristine).toBeTruthy();
    expect(address.errors['required']).toBeTruthy();
    address.setValue('111 Road 1')
    expect(address.errors).toBeNull();
  });
  it('Should check if "Your Phone" field is valid',()=>{
    let phone = component.billingDetails.controls['billingPhone'];
    expect(phone.valid).toBeFalsy();
    expect(phone.pristine).toBeTruthy();
    expect(phone.errors['required']).toBeTruthy();
    phone.setValue('test')
    expect(phone.errors['pattern']).toBeTruthy();
    phone.setValue('9899988')
    expect(phone.errors['minlength']).toBeTruthy();
    phone.setValue('9999999999')
    expect(phone.errors).toBeNull();
  });
  it('Should check if "Your Email" field valid before edited',()=>{
    let email = component.billingDetails.controls['billingEmail'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('test')
    expect(email.errors['email']).toBeTruthy();
  });
  it('Should check if "Your Email" entered is valid',()=>{
    let email = component.billingDetails.controls['billingEmail'];
    email.setValue('test@test.com')
    expect(email.errors).toBeNull();
  });

  it('Should check the billing details are valid on submit click', ()=>{
    el = fixture.debugElement.nativeElement.querySelector('#btn-submit');
    el.click();
    spyOn(component, 'submitBooks').and.callThrough();
    component.submitBooks();
    fixture.detectChanges();
    expect(component.submitBooks).toHaveBeenCalled();

  });
  it('Should check form is valid', ()=>{
    let name = component.billingDetails.controls['billingName'];
    name.setValue('test name');
    let email = component.billingDetails.controls['billingEmail'];
    email.setValue('test@test.com');
    let phone = component.billingDetails.controls['billingPhone'];
    phone.setValue('9899988889');
    let address = component.billingDetails.controls['billingAddress'];
    address.setValue('test address');
    expect(component.billingDetails.valid).toBeTruthy();
  });

  describe('frompage is buy', ()=>{
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
    it('should check if the frompage is buy', ()=>{
      spyOn(component, 'submitBooks').and.callThrough();
      component.submitBooks();
      expect(component.fromPage).toEqual('buy');
    });
    it('should check setBillingData is called', ()=>{
      spyOn(component, 'setBillingData').and.callThrough();
      component.setBillingData(data);
      expect(component.setBillingData).toHaveBeenCalledWith(data);
    })
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
