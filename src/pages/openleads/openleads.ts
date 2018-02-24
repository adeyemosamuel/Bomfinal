import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServerService} from '../../providers/server/server';
import {Storage} from '@ionic/storage';
import {StorageService} from '../../providers/storage/storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({selector: 'page-openleads', templateUrl: 'openleads.html'})
export class OpenleadsPage {
  username : string = '';
  leadspending : Array <any> = [];
  leadsdelivered : Array <any> = [];

  constructor(public navCtrl : NavController, public navParams : NavParams, private serverService : ServerService, private store : Storage, private _store : StorageService) {}

  ionViewDidLoad() {
    this.getPendingLeadsFromServer();
    this.getDeliveredLeadsFromServer();
  }

  async getPendingLeadsFromServer() {
    const user = await this._store.fetchDoc('loginuser');
    if (user != 'Failed') {
      this.username = user.username;
    }
    let body = {
      username: this.username
    };

    try {
      let response = await this.serverService.processData(body, '/showCountPending');
      console.log(response);
      this.leadspending = response;
    } catch (err) {
      console.log(err);
    }

  }

  //get delivered leads number from server
  async getDeliveredLeadsFromServer() {
    const user = await this._store.fetchDoc('loginuser');
    if (user != 'Failed') {
      this.username = user.username;
    }
    let body = {
      username: this.username
    };

    try {
      let response = await this
        .serverService
        .processData(body, '/showCountDelivered');
      console.log(response);
      this.leadsdelivered = response;
    } catch (err) {
      console.log(err);
    }

  }
  pendingLeads() {
    this
      .navCtrl
      .push('PendingPage');
  }

  deliveredLeads() {
    this
      .navCtrl
      .push('DeliveredPage');
  }

}
