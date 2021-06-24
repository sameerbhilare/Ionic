import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
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
    private modalCtrl: ModalController
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

  onBookPlace() {
    this.modalCtrl
      .create({ component: CreateBookingComponent })
      .then((modalEl) => {
        modalEl.present();
      });

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
}
