import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';
import { StorageService } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private store: StorageService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  logout() {
    this.viewCtrl.dismiss();
    this.store.clearStorage('out');
    this.navCtrl.setRoot('LoginPage');
  }

}
