//angular core imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//material
import {MaterialModule} from './material/material.module'

//application components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { BookComponent } from './components/book/book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BillingDetailsComponent } from './components/billing-details/billing-details.component';
import { BooksReducer } from './store/reducers/books.reducer';
import { environment } from '../environments/environment';
import { BooksEffects } from './store/effects/books.effects';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      books: BooksReducer
    }),
    EffectsModule.forRoot([BooksEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    MyCollectionComponent,
    SearchPageComponent,
    BookComponent,
    BookDetailsComponent,
    BillingDetailsComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
