import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { BillingDetailsComponent } from './billing-details.component';
describe('BillingDetailsComponent', () => {
  let component: BillingDetailsComponent;
  let fixture: ComponentFixture<BillingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule],
      declarations: [ BillingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDetailsComponent);
    component = fixture.componentInstance;
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
    let address = component.billingDetails.controls['billingName'];
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
