import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ValidateService } from '../../providers/validate/validate';
import { StorageService } from '../../providers/storage/storage';
import { ControllerService } from '../../providers/controller/controller';
import { AppData } from '../../providers/app-data/app-data';

@IonicPage()
@Component({
  selector: 'page-moredetails',
  templateUrl: 'moredetails.html',
})
export class MoredetailsPage {
  placeOfBirth: string;
  motherMaidenName: string;
  stateOfOrigin: string;
  lga: string;
  nextOfKin: string;
  kinRelationship: string;
  account: any;
  stateData: any = [];
  lgaData: any = [];
  kinTypeData: any = [];

  constructor(
    public navCtrl: NavController,
    private validate: ValidateService,
    private controller: ControllerService,
    private appdata: AppData,
    private store: StorageService,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoredetailsPage');
    this.stateData = this.appdata.getState();
    this.lgaData = this.appdata.getLGA();
    this.kinTypeData = this.appdata.getKinType();
  }

  ionViewDidEnter(){
    this.populateData();
  }

  async populateData() {
    this.account = await this.store.fetchDoc('account_details');
    this.placeOfBirth = this.account.placeOfBirth;
    this.motherMaidenName = this.account.maidenName;
    this.stateOfOrigin = this.account.stateOfOrigin;
    this.lga = this.account.lga;
    this.nextOfKin = this.account.kinName;
    this.kinRelationship = this.account.kinRelationship;
  }

  popover(ev) {
    this.controller.miscPopOver('PopoverPage', ev);
  }

  async next() {
    if (!this.validate.validateMoreDet(this.placeOfBirth, this.motherMaidenName, this.lga, this.stateOfOrigin, this.nextOfKin, this.kinRelationship)) {
      this.validate.displayMessage();
      return false;
    }

    this.account.placeOfBirth = this.placeOfBirth;
    this.account.maidenName = this.motherMaidenName;
    this.account.stateOfOrigin = this.stateOfOrigin;
    this.account.lga = this.lga;
    this.account.kinName = this.nextOfKin;
    this.account.kinRelationship = this.kinRelationship;

    let resp = await this.store.createUpdateDoc(this.account);
    console.log(resp);
    this.navCtrl.push('ConfirmPage', {
      moreInfo: true
    });
  }

}
