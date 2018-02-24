import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServerService } from '../../providers/server/server';
import { StorageService } from '../../providers/storage/storage';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage {
  loading: any;
  data: any;
  selectedItem: any;
  leadsArray: Array<any> = [];
  storage: any;
  username: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private store: Storage,
     private _store: StorageService,
     public loadingCtrl: LoadingController,
  
    private serverService: ServerService) {

  }
  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      spinner: 'custom-spinner',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`
    });
    this.getLeadsFromServer();
    this.loading.dismiss()
  }


  itemTapped(item) {
    this.navCtrl.push('LeadsDetailsPage', {
      item: item 
    });
  }

  addLead(){ 
    this.navCtrl.push('RegisterLeadsPage')
  }


//get leads from server
  async getLeadsFromServer() {
    const user = await this._store.fetchDoc('loginuser');
    if (user != 'Failed') {
      this.username = user.username;
    }
    let body = {
      username: this.username
    };

    try {
      let response = await this.serverService.processData(body, '/showListPending');
      console.log(response);
      this.leadsArray = response;
      this.store.set('leadsArray', this.leadsArray);
    } catch(err) {
      console.log(err);
    }
  }

}
