import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { User } from '../../model/user';
import {  AngularFireAuth } from "angularfire2/auth";
//import { HomePage } from '../home/home';
import { AgregarPage } from '../agregar/agregar';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  

  constructor(private ofAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
     public navParams: NavParams) {
  }

  async login(user: User) {
    try{
      const result = await this.ofAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      this.ofAuth.authState.subscribe(data =>{
        if(data && data.email && data.uid) {
          const modal = this.modalCtrl.create(AgregarPage);
          modal.present();
          this.createToast('Bienvenido(a)');
        }
        else{
          this.createToast("El usuario y/o contraseña son incorrectas. ");
        }
      })
      this.createToast(result);

    }
    catch(e){
      this.createToast(e);
    }
  }


register(){
  this.navCtrl.push('RegisterPage');
}

createToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000
  });
  toast.present();
}

}
