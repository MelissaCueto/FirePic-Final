import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../model/user';
import {  AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private ofAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try{
      const result = await this.ofAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.createToast(result);
      console.log(result);
      if (result){
        this.navCtrl.push(LoginPage);
      }

    }
    catch(e){
      this.createToast(e);
    }
  }


  createToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}
