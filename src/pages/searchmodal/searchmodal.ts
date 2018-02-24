import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController  } from 'ionic-angular';
import { Http } from '@angular/http';
import { ServerService } from '../../providers/server/server';

@IonicPage()
@Component({
  selector: 'page-searchmodal',
  templateUrl: 'searchmodal.html',
})
export class SearchmodalPage {
  data: Array<any> = [];
  _data: Array<any> = [];
  products: string = '';
  searchTerm: string='';
  title: any;

  constructor(
    public navCtrl: NavController, 
    public http: Http,
    private server: ServerService, 
    public navParams: NavParams,
    public viewCtrl:ViewController, 
    public modalCtrl: ModalController) {
  }

  async ionViewDidLoad() {
    this._data = this.navParams.get('data');
    this._data = this.navParams.get('title')
    // await this.getProductsData();
  }

  async getProductsData() {
    let body={
      keywordName: this._data
    };
    const response = await this.server.processData(body,'/getProductByKeyName');
    this.data = response;
    this._data=response;
  }
  
  async searchProduct(event){
    console.log(event.target.value);
    let body = {
      keywordName: event.target.value
    };
    
    // if (event.key === 'Enter') {
      let response = await this.server.processData(body, '/getProductByKeyName');
      console.log(response);
      this.data = response;
    // }
  }

  selectCancel() {
    this.viewCtrl.dismiss('');
  }

  toDescriptionView(e) {
    console.log(e);
    // console.log(title);
   
    this.navCtrl.push('Details3Page', {
      data: e,  
      title: this.title
    });
  }

}
