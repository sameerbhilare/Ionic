import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';

  startDate: string; // string bcz we want to pass it to template(html)
  endDate: string; // string bcz we want to pass it to template(html)

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    // in case of 'select' mode startDate and endDate will be undefined
    if (this.selectedMode === 'random') {
      // random start date between available from and to dates except last 1 week
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime()) // deducting startTime so that we dont consider from beginning of time which is 1st Jan 1970
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 - // 6 days starting from startTime not from beginning of time which is 1st Jan 1970
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onBookPlace() {
    // alternatively we can pass id of the modal which you can set while creating a modal
    // and also pass some data
    this.modalCtrl.dismiss({ message: 'This is a dummy message!' }, 'confirm');
  }

  onCancel() {
    // this will dismiss the nearest modal it finds
    // this.modalCtrl.dismiss();

    // alternatively we can pass id of the modal which you can set while creating a modal
    // and also pass some data
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
