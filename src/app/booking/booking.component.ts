import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[];
  isLoading = false;
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.isLoading = true;
    this.bookingService.getBookings().subscribe(bookings => {
      this.isLoading = false;
      this.bookings = bookings;
    });
  }
}
