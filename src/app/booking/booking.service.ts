import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) { }
  qrCodeReceived = new Subject<string>();
  qrCode: string;

  addBooking(booking: Booking) {
    this.http.post<{ message: string, qrCode: string }>(`${BACKEND_URL}/customer/bookings`, booking)
    .subscribe(response => {
      this.qrCode = response.qrCode;
      this.qrCodeReceived.next(this.qrCode);
    });
  }

  getUpdatedQRcode() {
    return this.qrCodeReceived.asObservable();
  }
}

