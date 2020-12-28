import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MyCollectionComponent } from './my-collection.component';

describe('MyCollectionComponent', () => {
  let component: MyCollectionComponent;
  let fixture: ComponentFixture<MyCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCollectionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should check trackByBook is called', fakeAsync(()=>{
    const dummyBook = {id:'1',title:'title 1',subtitle:'subtitle 1',description:'des 1',authors:['name'],imageLinks:{smallThumbnail:'smallthumbnail',thumbnail:'thumbnail'},averageRating: 5, publisher:'publisher',pageCount:10,language:'en',billingName:'name',billingAddress:'address',billingEmail:'test@test.com','billingPhone':'9999999999'};
    spyOn(component, 'trackByBook').and.callThrough();
    component.trackByBook(dummyBook);
    tick();
    fixture.detectChanges();
    expect(component.trackByBook).toHaveBeenCalledWith(dummyBook);
    expect(component.trackByBook(dummyBook)).toEqual(dummyBook.id);
  }));
});
