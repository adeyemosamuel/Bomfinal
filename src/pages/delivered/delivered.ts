import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ServerService} from '../../providers/server/server';
import {StorageService} from '../../providers/storage/storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({selector: 'page-delivered', templateUrl: 'delivered.html'})
export class DeliveredPage {
  username: string = '';
  loading : any;

  data : any;
  selectedItem : any;
  leadsArray : Array < any > = [];
  storage : any;

  constructor(public navCtrl : NavController, public navParams : NavParams, private store : Storage, public loadingCtrl : LoadingController, private serverService : ServerService, private _store: StorageService)
  {
    this.loading = this
      .loadingCtrl
      .create({content: `'Please wait...',
        <ion-spinner name="circles"></ion-spinner>`});
    this.getLeadsFromServer();

  }
  ionViewDidLoad() {
    this.getLeadsFromServer();
  }
  itemTapped(item) {
    this
      .navCtrl
      .push('LeadsDetailsPage', {item: item});
  }

  addLead() {
    this
      .navCtrl
      .push('RegisterLeadsPage')
  }

  //get leads from server
  async getLeadsFromServer() {
    const user = await this._store.fetchDoc('loginuser');
    if (user != 'Failed') this.username = user.username;
    let body = {
      username: this.username
    };

    try {
      let response = await this
        .serverService
        .processData(body, '/showListDelivered');
      console.log(response);
      this.leadsArray = response;
      this
        .store
        .set('leadsArray', this.leadsArray);
    } catch (err) {
      console.log(err);
    }
  }
}
