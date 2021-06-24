/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: 'b1',
      placeId: 'p1',
      placeTitle: 'Manhatten Mansion',
      guestNumber: 2,
      userId: 'abc',
    },
  ];

  get bookings() {
    return [...this._bookings];
  }
}
