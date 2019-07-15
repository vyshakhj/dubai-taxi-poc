import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { BookingComponent } from './booking/booking.component';
import { RideComponent } from './ride/ride.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'ride-details', component: RideComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

