import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  constructor(private router: Router, private navCtrl: NavController) {}

  ngOnInit() {}

  onBookPlace() {
    //this.router.navigateByUrl('/places/tabs/discover');

    /*
      NavController - under the hood will use angular router
      but will play proper animation based on forward or backward navigation
    */
    // way 1
    this.navCtrl.navigateBack('/places/tabs/discover');

    // way 2 - unreliable
    // does not work if stack is empty. So wont work is app starts from this page
    // ADVANTAGE - is we dont have to specify path/URL
    // this.navCtrl.pop();
  }
}
