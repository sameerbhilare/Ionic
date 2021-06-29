/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { PlaceLocation } from '../../../places/location.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  isLoading = false;

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

    const pickedLocation: PlaceLocation = {
      lat: resultData.data.lat,
      lng: resultData.data.lng,
      address: null,
      staticMapImageUrl: null,
    };

    this.isLoading = true;
    this.getAddress(resultData.data.lat, resultData.data.lng)
      .pipe(
        switchMap((address) => {
          console.log('Address => ', address);
          pickedLocation.address = address;
          return of(
            this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
          );
        })
      )
      .subscribe((staticMapImageUrl) => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedLocationImage = staticMapImageUrl;
        this.isLoading = false;
        // emit the location data
        this.locationPick.emit(pickedLocation);
        console.log('pickedLocation =>', pickedLocation);
      });
  }

  // get address from google maps for given coordinates
  getAddress(lat: number, lng: number) {
    // cors header required by positionstack
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'http://localhost:8100'); // required for positionstack

    return this.http
      .get<any>(
        `http://api.positionstack.com/v1/reverse?access_key=${environment.positionstackAPIKey}&query=${lat},${lng}`,
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

  // get map image for given coordinates
  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://open.mapquestapi.com/staticmap/v4/getmap?key=${environment.mapquestAPIKey}
            &size=500,300&zoom=${zoom}&center=${lat},${lng}`;
  }
}
