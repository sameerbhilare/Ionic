import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  authMode: 'login' | 'signup' = 'login';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async onLogin() {
    this.isLoading = true;
    // define spinner
    const spinnerEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...',
    });
    // show spinner
    await spinnerEl.present();
    this.authService.login();
    setTimeout(() => {
      this.isLoading = false;
      // dismiss the spinner
      spinnerEl.dismiss();
      this.router.navigateByUrl('/places/tabs/discover');
    }, 1500);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if (this.authMode === 'login') {
      // send request to login service
    } else {
      // send request to signup service
    }
  }

  // toggle auth mode - login or signup
  onSwitchAuthMode() {
    if (this.authMode === 'login') {
      this.authMode = 'signup';
    } else {
      this.authMode = 'login';
    }
  }
}
