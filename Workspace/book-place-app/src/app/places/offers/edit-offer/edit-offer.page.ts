import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  loadedPlace: Place;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.loadedPlace = this.placesService.getPlace(paramMap.get('placeId'));
      // initialize form
      this.form = new FormGroup({
        title: new FormControl(this.loadedPlace.title, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        description: new FormControl(this.loadedPlace.description, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)],
        }),
      });
    });
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }
}
