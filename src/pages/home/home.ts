import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Alert} from 'ionic-angular';
import { AlertController, AlertOptions } from 'ionic-angular';
import { LoadingController, LoadingOptions } from 'ionic-angular';
import { StorageService } from '../../providers/storage/storage';
import { ServerService } from '../../providers/server/server';
import { Nativeprocess } from '../../providers/native/native';
import { ControllerService } from '../../providers/controller/controller';

@IonicPage()
@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
  Username : any;
  password: string = '';
  uuid: string = '';
  user: any = {};
  topUser: any = [];
  ecData: any = [];

  constructor(
    public navCtrl : NavController, 
    public navParams : NavParams, 
    private store : StorageService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private server: ServerService,
    private native: Nativeprocess,
    private controller: ControllerService
  ) {}

  async ionViewDidLoad() {
    await this.initializeData();
  }

  async initializeData() {
    this.user = await this.store.fetchDoc('loginuser');
    if (this.user != 'Failed') this.Username = this.user.username;

    let device = await this.store.fetchDoc('device');
    this.uuid = device.uuid;

    if (this.uuid == 'this.device.uuid' || this.uuid == '' || this.uuid == null) {
      this.uuid = this.native.deviceUUID();
    }
  }

  gotoNewPage(pageName) {
    (pageName === 'AccountPage') ? this.accountOpening() : this.navCtrl.push(pageName);
  }

  accountOpening() {
    const alertOptions: AlertOptions = {
      message: 'Enter your password',
      inputs: [
        {
          placeholder: 'Password',
          type: 'password',
          name: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: () => {
            alert.onDidDismiss(async (data) => {
              await this.validatePassword(data);
            });
          }
        }
      ]
    };
    const alert = this.alertCtrl.create(alertOptions);
    alert.present();
  }

  async validatePassword(data) {
    this.password = data.password;
    const loadingOptions: LoadingOptions = {
      content: 'Authenticating...'
    };
    const loader = this.loadingCtrl.create(loadingOptions);
    loader.present();

    const response = await this.server.processData(this.requestBody(), '/login');
    await this.responseReceived(response);
    loader.dismiss();
  }

  requestBody() {
    return {
      'username': this.Username,
      'password': this.password,
      'location': this.user.location,
      'deviceUUID': this.uuid,
      'financialInstitution':'1'
    };
  }

  async responseReceived(resp) {
    if (resp.responseCode == '76') {
      var topUserName = resp.data[0];
      var topUserAcc = resp.data[1];

      // Leaderboard
      for(var i=0; i<topUserName.length; i++)
      {
        if (topUserName[i] != null)
        {
          this.topUser.push({
            username:topUserName[i],
            accounts:topUserAcc[i],
            position: 'assets/images/Circled'+(i+1)+'.png'
          });
        }
      }
      console.log(this.topUser);

      // ECs and RMs
      if (resp.branches != null) {
        for (let val of resp.branches)
        {
          this.ecData.push({
            branchcode: val.branchCode,
            branchname: val.branchName,
            rm: val.dummyDsa,
            userid: val.rmuserId
          });
        }
      }
      console.log(this.ecData);
      this.user.username = this.Username;
      this.user.harsh = this.password;
      this.user.noOfAccounts = resp.accCount;

      let ecResp = await this.store.fetchDoc('ec');
      ecResp.item = this.ecData;

      let leaderboard = await this.store.fetchDoc('leaderboard');
      leaderboard.item = this.topUser;

      let bulkUpload = await this.store.bulkCreateDoc([this.user, ecResp, leaderboard]);
      console.log(bulkUpload);
      this.navCtrl.setRoot('HomePage');
    }
    else if (resp.responseCode == '96'){
      this.controller.toastCtrl(resp.message, 'middle', false);
    }
    else{
      this.controller.toastCtrl('Unable to login. Try again!', 'middle', false);
    }
  }

}
