import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  loadedPlace: Place;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.loadedPlace = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  async onBookPlace() {
    // define action sheet
    // An actionsheet is basically a set of options that slides up from the bottom of the page.
    const actionSheetEl = await this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookModal('select');
          },
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookModal('random');
          },
        },
        // role 'destructive' will turn the button red.
        // role 'cancel' will be placed at the last (bottommost)
        { text: 'Cancel', role: 'cancel' },
      ],
    });

    // present the action sheet
    await actionSheetEl.present();

    // this.modalCtrl
    //   .create({
    //     component: CreateBookingComponent,
    //     componentProps: { selectedPlace: this.loadedPlace },
    //   })
    //   .then((modalEl) => {
    //     modalEl.present();
    //   });

    //this.router.navigateByUrl('/places/tabs/discover');

    /*
      NavController - under the hood will use angular router
      but will play proper animation based on forward or backward navigation
    */
    // way 1
    //this.navCtrl.navigateBack('/places/tabs/discover');

    // way 2 - unreliable
    // does not work if stack is empty. So wont work is app starts from this page
    // ADVANTAGE - is we dont have to specify path/URL
    // this.navCtrl.pop();
  }

  async openBookModal(mode: 'select' | 'random') {
    // we can pass any datato model via 'componentProps'
    // create modal
    const modal = await this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.loadedPlace, selectedMode: mode },
    });
    // present modal
    await modal.present();

    // on dismiss
    const resultData = await modal.onWillDismiss();
    console.log(resultData);
    if (resultData.role === 'confirm') {
      console.log('Booked!');
    }
  }
}
