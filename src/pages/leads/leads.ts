import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServerService } from '../../providers/server/server';
import { StorageService } from '../../providers/storage/storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-leads',
  templateUrl: 'leads.html',
})
export class LeadsPage { 
data: any;
selectedItem: any;
leadsArray: Array<any> = [];
storage:any;
_username: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store: Storage,
    private serverService: ServerService,
    private _store: StorageService
  ) { 
  }

  ionViewDidLoad() {
    this.getLeadsFromServer();
  }

  itemTapped(item) {
    this.navCtrl.push('LeadsDetailsPage', {
      item: item
    });
  }

  addLead(){ 
    this.navCtrl.push('RegisterLeadsPage')
  }
 
  getLeads() {
    this.store.get('leads').then((val) => {
      this.leadsArray = val;

    });
  }
  
  async getLeadsFromServer() {
    const user = await this._store.fetchDoc('loginuser');
    if (user != 'Failed') {
      this._username = user.username
    }
    let body = {
      username: this._username 
    };

    try {
      let response = await this.serverService.processData(body, '/checkleads');
      console.log(response);
      this.leadsArray = response;
    } catch(err) {
      console.log(err);
    }
  }

  notifications(){
    this.navCtrl.push('ReminderPage');
  }

}
