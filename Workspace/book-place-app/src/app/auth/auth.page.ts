import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async authenticate(email: string, password: string) {
    this.isLoading = true;
    // define spinner
    const spinnerEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...',
    });
    // show spinner
    await spinnerEl.present();
    this.authService.login();
    // send request to signup service
    this.authService.signup(email, password).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        // dismiss the spinner
        spinnerEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      },
      (errRes) => {
        // dismiss the spinner
        spinnerEl.dismiss();
        console.log(errRes);
        const errCode = errRes.error.error.message;
        let message = 'Could not sign you up, please try again later!';
        if (errCode === 'EMAIL_EXISTS') {
          message = 'This email address already exists!';
        }
        this.showAlert(message);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);

    // if (this.authMode === 'login') {
    //   // send request to login service
    // } else {
    //   // send request to signup service
    // }
  }

  // toggle auth mode - login or signup
  onSwitchAuthMode() {
    if (this.authMode === 'login') {
      this.authMode = 'signup';
    } else {
      this.authMode = 'login';
    }
  }

  private showAlert(message: string) {
    // show alert
    this.alertCtrl
      .create({
        header: 'Authentication Failed!',
        message,
        buttons: ['Okay'],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
