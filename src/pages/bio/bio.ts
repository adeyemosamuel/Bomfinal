import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ValidateService } from '../../providers/validate/validate';
import { StorageService } from '../../providers/storage/storage';
import { ControllerService } from '../../providers/controller/controller';
import { AppData } from '../../providers/app-data/app-data';
import { Nativeprocess } from '../../providers/native/native';

@IonicPage()
@Component({
  selector: 'page-bio',
  templateUrl: 'bio.html',
})
export class BioPage {
  title: string = ''; 
  firstName: string = ''; 
  middleName: string = '';
  lastName: string = '';
  gender: string = '';
  relStatus: string = '';
  occup: string = '';
  dob: string = '';
  _dob: string = '';
  account: any;
  titleData: any = [];
  relStatusData: any = [];

  constructor(
    public navCtrl: NavController,
    private validate: ValidateService,
    private _storage: StorageService,
    private controller: ControllerService,
    private appdata: AppData,
    private native: Nativeprocess,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BioPage');

    this.titleData = this.appdata.getTitle();
    this.relStatusData = this.appdata.getRelStatus();
  }

  ionViewDidEnter(){
    this.populateData();
  }

  async populateData() {
    this.account = await this._storage.fetchDoc('account_details');
    this.title = this.account.title.trim();
    this.firstName = this.account.firstName.trim();
    this.middleName = this.account.middleName.trim();
    this.lastName = this.account.lastName.trim();
    this.gender = this.account.gender.trim();
    this.relStatus = this.account.maritalStatus.trim();
    this.occup = this.account.occupation.trim();
    this.dob = this.account.dob.trim();
  }

  async next(){
    if (!this.validate.validateBio(this.title.trim(), this.firstName.trim(), this.middleName.trim(), this.lastName.trim(), this.gender.trim(), this.relStatus.trim(), this.occup.trim(), this.dob.trim())) {
      this.validate.displayMessage();
    }
    else {
      this.account.title = this.title;
      this.account.firstName = this.firstName;
      this.account.middleName = this.middleName;
      this.account.lastName = this.lastName;
      this.account.gender = this.gender;
      this.account.maritalStatus = this.relStatus;
      this.account.occupation = this.occup;
      this.account.dob = this.dob;
      let resp = await this._storage.createUpdateDoc(this.account);
      console.log(resp);
      this.navCtrl.push('DetailsPage');
    }
  }

  popover(ev) {
    this.controller.miscPopOver('PopoverPage', ev);
  }

}
