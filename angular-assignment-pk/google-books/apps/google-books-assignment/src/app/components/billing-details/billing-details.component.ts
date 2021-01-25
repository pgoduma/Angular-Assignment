import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../../models/book-model';
import { map } from 'rxjs/operators';
import { BooksFacade } from '../../store/books.facade';

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
    private router: Router,
    public  dialog: MatDialog,
    private route: ActivatedRoute,
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
        this.bookFacadeService.booksList$
          .pipe(map((arr) => arr.filter((item) => item.id === this.bookId)))
          .subscribe((res) => {
            book = this.setBillingData({...res[0]})
          });
        this.bookFacadeService.addToMyCollection(book);
      }
      if (this.fromPage === 'cart') {
        let books = [];
        this.bookFacadeService.cartItemsList$
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
