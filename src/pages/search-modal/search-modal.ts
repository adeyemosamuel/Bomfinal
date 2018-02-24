import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AtmdataProvider } from '../../providers/atmdata/atmdata';

@IonicPage()
@Component({
  templateUrl: 'search-modal.html',
})
export class SearchModalPage {
  category_type: any[];
  sector_category_type: any[];
  segment = "products";
  data: any;
  _data: any;
  sectors: Array<any> = [];
  _sectors: Array<any> = [];

  constructor(public navCtrl: NavController, public http: Http,public viewCtrl:ViewController, public modalCtrl: ModalController,public Data: AtmdataProvider, public navParams: NavParams) {
    let localData = this.http.get('assets/product.json').map(res => res.json());
    let local_Data = this.http.get('assets/sector.json').map(res => res.json());
    localData.subscribe(data => {
      this.category_type = data;
    })
 
    local_Data.subscribe(data => {
      this.sector_category_type = data;
      this._sectors = data;
      console.log(this.sector_category_type);
    });
  }

  selectCancel() {
    this.viewCtrl.dismiss('');
  }

}
