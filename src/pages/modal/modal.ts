import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServerService } from '../../providers/server/server';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  data: Array<any> = [];
  _data: Array<any> = [];
  products: string = '';
  searchTerm: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams, private server: ServerService, public viewCtrl: ViewController) {
  }

  async ionViewDidLoad() {
    await this.getProductsData();
  }
 
  async getProductsData() {
    const response = await this.server.getData('/products');
    this.data = response;
    this._data=response;
  }

  selectCancel() {
    this.viewCtrl.dismiss('');
  }

  selectDone() {
    this.viewCtrl.dismiss(this.products);
  }

  getItems(ev) {
    this.data = this._data;
    var val = ev.target.value; 

    if (val && val.trim() != '') {
      this.data = this.data.filter((item) => {
        return (item.productName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

  }
}
