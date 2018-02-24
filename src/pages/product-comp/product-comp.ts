import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ServerService } from '../../providers/server/server';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-product-comp',
  templateUrl: 'product-comp.html',
})
export class ProductCompPage {
 loading:any
  segment = "products";
  data: any;
  _data: any;
  sectors: Array<any> = [];
  _sectors: Array<any> = [];
  searchModalData: string = '';
  

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private serverService: ServerService, 
    public modalCtrl: ModalController, 
    public navParams: NavParams
  ) {}

  async ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      spinner: "circles",
      content: 'Please wait....',
      duration: 3000
    });
    this.loading.present();
    const response = await this.serverService.getData('/category');
    this.data = response;
    console.log(this.data);

    const sectorres = await this.serverService.getData('/sectors');
    this.sectors = sectorres;
    console.log(this.sectors);
     this.loading.dismiss();
  }

  productsByCategory(item,categoryName) {
    this.navCtrl.push('Test2Page', {
      data: item,
      title: categoryName 
    });
  } 

  productsBySector(val, sectorName) {
    this.navCtrl.push('Test3Page', {
      data: val,
      title: sectorName
    });
  }

  searchModal(){
    let modal = this.modalCtrl.create('SearchmodalPage');
    modal.present();
    modal.onDidDismiss(data => {
      console.log(data);
      this.searchModalData = data;
    });
   }



  
}





