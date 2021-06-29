import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {}

  async onPickLocation() {
    // create modal
    const modal = await this.modalCtrl.create({ component: MapModalComponent });
    // present the modal
    await modal.present();
    // on dismiss
    const resultData = await modal.onWillDismiss();
    console.log(resultData);
    if (!resultData.data) {
      return;
    }

    this.getAddress(resultData.data.lat, resultData.data.lng).subscribe(
      (address) => {
        console.log('Address => ', address);
      }
    );
  }

  // get address from google maps for given coordinates
  getAddress(lat: number, lng: number) {
    // cors header required by positionstack
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'http://localhost:8100'); // required for positionstack

    return this.http
      .get<any>(
        `http://api.positionstack.com/v1/reverse?access_key=${environment.positionStackAPIKey}&query=${lat},${lng}`,
        {
          headers,
        }
        //`https://maps.googleapis.com/maps/api/geocode/json?key=&latlng=${lat},${lng}`
      )
      .pipe(
        // For google geocoding API
        /*
        map((geoData) => {
          console.log(geoData);
          if (!geoData || !geoData.results || geoData.results.length <= 0) {
            return null;
          }
          // return first result
          return geoData.results[0].formatted_address;
        })*/

        // For positionstack geocoding API
        map((geoData) => {
          console.log(geoData);
          if (!geoData || !geoData.data || geoData.data.length <= 0) {
            return null;
          }
          // return first result
          return geoData.data[0].label;
        })
      );
  }
}
