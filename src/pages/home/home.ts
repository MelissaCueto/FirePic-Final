import { Component  } from '@angular/core';
import { ModalController, NavController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Platillo} from '../../commons/platillo'
import { BebidasPage } from '../../pages/bebidas/bebidas';
import { VistaPage } from '../../pages/vista/vista';
import { AgregarPage } from '../agregar/agregar';
import {  AngularFireAuth } from "angularfire2/auth";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  vista:any = VistaPage;

  private itemsCollection: AngularFirestoreCollection<Platillo>;

  platillos: Observable<Platillo[]>;

  constructor(private ofAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private readonly afs: AngularFirestore, 
    public modalCtrl: ModalController, 
    public navCtrl: NavController) {

                this.itemsCollection = afs.collection<Platillo>('platillos');
                this.platillos = this.itemsCollection.snapshotChanges().pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Platillo;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  }))
                );   
  }

  irLogin(){
    this.navCtrl.push('LoginPage');
  }


  detalles(platillo: Platillo){
    this.navCtrl.push(VistaPage, {
      id: platillo
    })
  }

  iraBebida(){
    this.navCtrl.push(BebidasPage);
  }

  createToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
  
}
