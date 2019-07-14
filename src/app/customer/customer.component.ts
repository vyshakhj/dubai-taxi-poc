import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Booking } from '../booking/booking.model';
import { BookingService } from '../booking/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-content-example-dialog',
  template: `
  <h2 mat-dialog-title>Alert</h2>
  <mat-dialog-content class="mat-typography">Are you sure you want to continue?</mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>No</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
  </mat-dialog-actions>`
})
export class DialogContentExampleDialogComponent { }

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, public bookingService: BookingService) { }
  qrCode: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAAGaAQMAAAAMyBcgAAAABlBMVEX///8AAABVwtN+AAACBklEQVR4nO2aTa6DMAyELXEAjtSr50gcIJJb/E9pVT29XTyzKIT4Y2U59hQiCIIgCIKg/4hNk+jx+mE+zqe7LF8auwcMQE0gXZxRRJvtPZQUaF7iADWAfE8ySJaSQfYO2TjzC1BDiCOXJHkuG4D6QRoVAa+s2lgqDqBmkFyi25DQ86ix0F/nE6DlIJMF3H88AFAT6KLNWg7LJVn+FKDloI2tCc2xhAyyeYUnoD5QPKn+xWFvM3JnBtQFsiKSDacEaFZFO3rcmg9A60LDzxYtJ/GMLI3ogwAtDGlheUjHGbPJoOhTD78bgHpAnA6F4pk3PqXkiwD1gXZPo/qPSNSZ/d3WArQwNCKqzCY8vZyEkwGoCeT95yx4TiSSZLVZBbQ85OXk2m3EyKouF6BukMi+q9HCEjWlDC2AWkBuU1TDIvGyAagLpEank5ZQcudO+AcnA9C6EIeLyXaibHyZTfhigwJaH9ImNAwLlVoXMar4OwC1gDJATxn7BMsmWP9b5C2NAK0LMdte9bb2sMPZngHqAtWEIjtbtM7kGRSeBqAGkGfKrHvWfPgZJN4WoC7QkEvpO2JA8SY07wC1gLKS5LESY4mo9KmAOkG6J0vfkA6EiO4DCqD1IbKzRXKJwvz8MtUAWheSyxvETlpjenc+AC0LmaZ/c1Vmk/S7vg4ogJaDIAiCIAiC/q4ntU+8ksn13rQAAAAASUVORK5CYII=';
  bookingSub: Subscription;

  selectedForm = 1;
  isOTPRequested = false;
  booking: Booking = {
    bagsCount: 0,
    bookingType: '',
    destination: '',
    mobileNumber  : '',
    passgengersCount: 0,
    qrCode: '',
    scheduledTime: '',
    vehicleType: ''
  };

  ngOnInit(): void {

  }

  onRideSelection(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.booking.bookingType = form.value.bookingType;
    this.selectedForm = 2;
  }

  onOtpRequest(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.booking.mobileNumber = form.value.mobileNumber;
    this.isOTPRequested = true;
  }

  onOtpVerification(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.selectedForm = 3;
  }

  onBookRide(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.booking.destination = form.value.destination;
    this.booking.vehicleType = form.value.vehicleType;
    this.booking.passgengersCount = form.value.passgengersCount;
    this.booking.bagsCount = form.value.bagsCount;

    this.openDialog();
  }

  onScheduleRide(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.booking.destination = form.value.destination;
    this.booking.vehicleType = form.value.vehicleType;
    this.booking.passgengersCount = form.value.passgengersCount;
    this.booking.bagsCount = form.value.bagsCount;
    this.booking.scheduledTime = form.value.scheduledTime;

    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.addBooking(this.booking);
        this.bookingService.getUpdatedQRcode().subscribe((qrCode) => {
            this.qrCode = qrCode;
            this.selectedForm = 4;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.bookingSub.unsubscribe();
  }
}


