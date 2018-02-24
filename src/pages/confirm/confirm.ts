import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ValidateService } from '../../providers/validate/validate';
import { ServerService } from '../../providers/server/server';
import { ControllerService } from '../../providers/controller/controller';
import { StorageService } from '../../providers/storage/storage';
import { Nativeprocess } from '../../providers/native/native';
import { AppData } from '../../providers/app-data/app-data';

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  account: any = [];
  username: string = '';
  password: string = '';
  uuid: string = '';
  photo: string = '';
  mandate: string = '';
  title: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  gender: string = '';
  relStatus: string = '';
  _relStatus: string = '';
  occup: string = '';
  dob: string = '';
  phoneNum: string = '';
  email: string;
  address: string = '';
  state: string = '';
  _state: any;
  ec: string = '';
  rm: string = '';
  bvn: string = '';
  prodCode: string = '';
  acctBal: string = '';
  pob: string = '';
  stateOfOrigin: string = '';
  _stateOfOrigin: any;
  lga: string = '';
  nextOfKin: string = '';
  kinRelationship: string = '';
  channel: string = '';
  pendingDoc: string = '';
  motherMaidenName: string = '';
  token: string = '';
  location: string = '';
  resp: any = {};
  showInfo: boolean = false;

  constructor(
    public navCtrl: NavController,
    private validate: ValidateService,
    private serverservice: ServerService,
    private controller: ControllerService,
    private native: Nativeprocess,
    private appdata: AppData,
    private navParam: NavParams,
    private storage: Storage,
    private store: StorageService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
    this.showInfo = this.navParam.get('moreInfo');
  }

  ionViewDidEnter(){
    this.populateData();
  }

  async populateData() {
    let user = await this.store.fetchDoc('loginuser');
    this.username = user.username;
    this.password = user.harsh;
    this.location = user.location;

    let device = await this.store.fetchDoc('device');
    console.log(device);
    this.uuid = device.uuid;

    let accountDet = await this.store.fetchDoc('account_details');
    console.log(accountDet);
    this.title = accountDet.title;
    this.firstName = accountDet.firstName;
    this.middleName = accountDet.middleName;
    this.lastName = accountDet.lastName;
    this.gender = accountDet.gender;
    this.relStatus = accountDet.maritalStatus;
    if (this.relStatus == 'SINGL') {
      this._relStatus = 'SINGLE';
    } else if (this.relStatus == 'MRIED') {
      this._relStatus = 'MARRIED';
    } else {
      this._relStatus = 'OTHERS';
    }
    this.occup = accountDet.occupation;
    this.dob = accountDet.dob;

    this.bvn = accountDet.bvn;
    this.phoneNum = accountDet.phoneNum;
    this.email = accountDet.email;
    this.address = accountDet.address;
    this.ec = accountDet.ec;
    this.rm = accountDet.rm;
    this.prodCode = accountDet.product;
    this.channel = accountDet.channel;
    this.pendingDoc = accountDet.pendingDoc;
    this.state = accountDet.state;
    this._state = this.appdata.getState().filter(item => {
      return item.value == this.state;
    });
    this._state = this._state[0].label;
    this.acctBal = this.account.acctBal;

    this.pob = accountDet.placeOfBirth;
    this.stateOfOrigin = accountDet.stateOfOrigin;
    if (this.stateOfOrigin != '' && this.stateOfOrigin != null) {
      this._stateOfOrigin = this.appdata.getState().filter(item => {
        return item.value == this.stateOfOrigin;
      });
      this._stateOfOrigin = this._stateOfOrigin[0].label;
    }
    this.lga = accountDet.lga;
    this.nextOfKin = accountDet.kinName;
    this.kinRelationship = accountDet.kinRelationship;
    this.motherMaidenName = accountDet.maidenName;
  }

  popover(ev) {
    this.controller.miscPopOver('PopoverPage', ev);
  }

  async capturePhoto() {
    let pic = await this.native.takePicture();
    if (pic == 'Failed') {
      this.photo = this.appdata.getPhoto();
      // this.photo = this.photo;
    }
    else {
      this.photo = pic;
    }
  }

  captureMandate() {
    let popCtrl = this.controller.popOver('SignaturePage');
    popCtrl.present();
    popCtrl.onDidDismiss((val) => {
      console.log(val);
      if (val != 'cancel') {
        this.mandate = val;
      }
    });
  }

  async submit() {
    if (!this.validate.validateMandate(this.mandate, this.photo)) {
      this.validate.displayMessage();
      return false;
    }

    let loader = this.controller.loadCtrl('Processing...');
    loader.present();
    console.log(this.location);
    var selectDocument = '';
    var selectChannel = '';

    for (var selectDoc of this.pendingDoc) {
      selectDocument += `${selectDoc}` + ', ';
    }
  
    for (var selectChnl of this.channel) {
      selectChannel += `${selectChnl}` + ', ';
    }

    let body = {
      'username': this.username, 
      'password': this.password, 
      'deviceUUID': this.uuid, 
      'location': this.location, 
      'customerBVN': this.bvn,
      'MaritalStatus': this.relStatus, 
      'customerTitle': this.title,
      'state': this.state,
      'firstName': this.firstName, 
      'lastName': this.lastName, 
      'middleName': this.middleName, 
      'dateOfBirth': this.dob, 
      'gender': this.gender,
      'phoneNumber': this.phoneNum,
      'emailAddress': this.email,
      'customerAddress': this.address,
      'productCode': this.prodCode, 
      'status': 'NEW', 
      'pendingDocs': selectDocument,
      'desiredChannels': selectChannel,
      'customerPhoto': this.photo, 
      'customerMandate': this.mandate, 
      'otp': this.token,
      'branch': this.ec,
      'rmcode': this.rm,
      'financialInstitution': '1', 
      'freeCode0': '1',
      'freeCode1': '1',
      'freeCode2': '1',
      'freeCode3': '1',
      'PlaceOfBirth': this.pob,
      'MotherMaidenName': this.motherMaidenName,
      'StateofOrigin': this.stateOfOrigin,
      'LocalGovernment': this.lga,
      'NextOfKin': this.nextOfKin,
      'NextOfKinRelationship': this.kinRelationship
    }
    var funcName = '/accountopening';
    console.log(body);

    try {
      let response = await this.serverservice.processData(body, funcName);
      if (response.responseCode == '76') {
        this.navCtrl.push('ResultPage', {
          newAccount: response.message,
          firstName: this.firstName,
          mandate: this.mandate,
          photo: this.photo,
          username: this.username,
          password: this.password
        });
      }
      else if (response.responseCode == '96') {
        this.controller.toastCtrl(response.message, 'middle', false);
      }
      else {
        this.controller.toastCtrl("Couldn't create Account. Try again", 'middle', false);
      }
    }
    catch(err) {
      console.log(err);
    }
    loader.dismiss();
  }

}
