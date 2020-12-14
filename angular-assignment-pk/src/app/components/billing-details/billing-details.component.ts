import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';


@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  billingDetails:FormGroup = null;
  loading:boolean = false;
  constructor(private fb: FormBuilder, private shared: SharedService, private router: Router, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.billingDetails = this.fb.group({
      billingName: ['', Validators.required],
      billingEmail: ['', [Validators.required, Validators.email]],
      billingPhone: ['', [Validators.required,  Validators.pattern(/^[0-9]\d*$/)]],
      billingAddress: ['', [Validators.required]],
    })
  }
  submitBooks(){
    if(this.billingDetails.valid){
     let billingData = this.billingDetails.value;
     this.shared.billingBookData.forEach(item=>{
       item.billingName = billingData.billingName;
       item.billingPhone = billingData.billingPhone;
       item.billingEmail = billingData.billingEmail;
       item.billingAddress = billingData.billingAddress;
     });
     this.shared.myCollectionItems = this.shared.myCollectionItems.concat(this.shared.billingBookData);
     this.shared.cartItems = [];
     console.log(this.shared.myCollectionItems);
     this.openDialog();
    }
  }

  openDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = false;
    config.ariaLabel = 'Purchase Successful';
    config.ariaDescribedBy = 'purchase-successfull-dialog';
    const dialogRef = this.dialog.open(PurchaseSuccessDialog, config);
    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
      this.router.navigate(['mycollection']);
    });
  }
}

@Component({
  selector: 'purchase-success',
  templateUrl: 'purchase-success.html',
})
export class PurchaseSuccessDialog {
  
  constructor(private dialogRef: MatDialogRef<PurchaseSuccessDialog>){
    
  }
  closeDialog(){
     this.dialogRef.close('Purchase Successfull');
  }
}