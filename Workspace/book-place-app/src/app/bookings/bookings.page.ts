import { Component, OnDestroy, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  bookingsSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingsSub = this.bookingService.bookings.subscribe((bookings) => {
      this.loadedBookings = bookings;
    });
  }

  async onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // define spinner
    const spinnerEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Cancelling Booking...',
    });
    // show spinner
    await spinnerEl.present();
    this.bookingService.cancelBooking(bookingId).subscribe(() => {
      // dismiss the spinner
      spinnerEl.dismiss();
      console.log('Booking cancelled!', bookingId);
    });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }
}
