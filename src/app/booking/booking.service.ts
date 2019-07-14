import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) { }
  qrCodeReceived = new Subject<string>();
  qrCode: string;

  addBooking(booking: Booking) {
    this.http.post<{ message: string, qrCode: string }>('http://localhost:3000/api/customer/bookings', booking)
    .subscribe(response => {
      this.qrCode = response.qrCode;
      this.qrCodeReceived.next(this.qrCode);
    });
  }

  getUpdatedQRcode() {
    return this.qrCodeReceived.asObservable();
  }
}

