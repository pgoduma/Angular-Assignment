import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { CartComponent } from './components/cart/cart.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BillingDetailsComponent } from './components/billing-details/billing-details.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'mycollection',
    component: MyCollectionComponent
  },
  {
    path: 'book-details/:id',
    component: BookDetailsComponent
  },
  {
    path: 'billing-details/:page',
    component: BillingDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
