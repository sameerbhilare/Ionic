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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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
