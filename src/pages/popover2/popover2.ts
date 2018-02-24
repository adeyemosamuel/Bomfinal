import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController } from 'ionic-angular';
import { StorageService } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-popover2',
  templateUrl: 'popover2.html'
})
export class Popover2Page {

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private store: StorageService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popover2Page');
  }

  logout() {
    this.viewCtrl.dismiss();
    this.store.clearStorage('out');
    this.navCtrl.setRoot('LoginPage');
  }

}
