import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-leads-details',
  templateUrl: 'leads-details.html',
})
export class LeadsDetailsPage {
  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadsDetailsPage');
  }

}
