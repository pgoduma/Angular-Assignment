import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../../models/book-model';
import { SharedService } from '../../service/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state.model';
import { AddToMyCollection, RemFromCart } from 'src/app/store/actions/books.actions';
import { filter, map } from 'rxjs/operators';
import { BooksFacade } from 'src/app/store/books.facade';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss'],
})
export class BillingDetailsComponent implements OnInit {
  billingDetails: FormGroup = null;
  loading: boolean = false;
  fromPage: string;
  bookId: string;
  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private bookFacadeService: BooksFacade
  ) {
    this.route.params.subscribe((params) => {
      this.fromPage = params.page;
      this.bookId = params.id;
    });
  }

  ngOnInit(): void {
    this.billingDetails = this.fb.group({
      billingName: ['', Validators.required],
      billingEmail: ['', [Validators.required, Validators.email]],
      billingPhone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      billingAddress: ['', [Validators.required]],
    });
  }
  submitBooks() {
    if (this.billingDetails.valid) {
      if (this.fromPage === 'buy') {
        let book;
        this.store
          .select((store) => store.books.booksList)
          .pipe(map((arr) => arr.filter((item) => item.id === this.bookId)))
          .subscribe((res) => {
            book = this.setBillingData({...res[0]})
          });
        this.bookFacadeService.addToMyCollection(book);
      }
      if (this.fromPage === 'cart') {
        let books = [];
        this.store
          .select((store) => store.books.cartItems)
          .pipe(map((arr) => arr.map((item) => this.setBillingData({...item}))))
          .subscribe((res) => {
            books = [...res];
          });
          books.forEach(book=>{
          this.bookFacadeService.addToMyCollection(book);
          this.bookFacadeService.remFromCart(book);
        })
      }
      this.openDialog();
    }
  }
  setBillingData(book: BookModel) {
    let billingData = this.billingDetails.value;
    book.billingName = billingData.billingName;
    book.billingPhone = billingData.billingPhone;
    book.billingEmail = billingData.billingEmail;
    book.billingAddress = billingData.billingAddress;
    return book;
  }
  openDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = false;
    config.ariaLabel = 'Purchase Successful';
    config.ariaDescribedBy = 'purchase-successfull-dialog';
    const dialogRef = this.dialog.open(PurchaseSuccessDialog, config);
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.router.navigate(['mycollection']);
    });
  }
}

@Component({
  selector: 'purchase-success',
  templateUrl: 'purchase-success.html',
})
export class PurchaseSuccessDialog {
  constructor(private dialogRef: MatDialogRef<PurchaseSuccessDialog>) {}
  closeDialog() {
    this.dialogRef.close('Purchase Successfull');
  }
}
