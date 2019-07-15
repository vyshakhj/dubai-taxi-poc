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
  qrCode: string;
  bookingSub: Subscription;

  selectedForm = 1;
  isOTPRequested = false;
  booking: Booking = {
    bookingId: '',
    bagsCount: 0,
    bookingType: '',
    destination: '',
    mobileNumber: '',
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
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}


