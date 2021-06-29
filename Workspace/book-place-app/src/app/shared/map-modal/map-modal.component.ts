import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElementRef: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getGoogleMaps()
      .then((googleMaps) => {
        // got google maps
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 16,
        });

        // when map has been loaded on page. Listening only once
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          // Renderer2 is class from Angular to interact with DOM
          this.renderer.addClass(mapEl, 'visible'); // adding 'visible' class to mapEl element
        });
      })
      .catch((err) => {
        // failed to get google maps
        console.log(err);
      });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    if (googleModule && googleModule.maps) {
      // it means the Google maps JS SDK has been already loaded
      return Promise.resolve(googleModule.maps);
    } else {
      // load the Google maps JS SDK
      return new Promise((resolve, reject) => {
        // we rarely create DOM elements manually from Angular apps. ****
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=';
        // to load the script in non-blocking way
        script.async = true;
        script.defer = true;
        // append this script element to body
        document.body.appendChild(script);

        // wait for script to load
        script.onload = () => {
          const loadedGoogleModule = win.google;
          if (loadedGoogleModule && loadedGoogleModule.maps) {
            resolve(loadedGoogleModule.maps);
          } else {
            reject('Google Maps SDK not available!');
          }
        };
      });
    }
  }
}
