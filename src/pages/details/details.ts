import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ValidateService } from '../../providers/validate/validate';
import { StorageService } from '../../providers/storage/storage';
import { ControllerService } from '../../providers/controller/controller';
import { AppData } from '../../providers/app-data/app-data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  bvn: string = '';
  phoneNum: string = '';
  email: string = '';
  address: string = '';
  ec: string = '';
  rm: string = '';
  productCode: string = '';
  channel: string = '';
  pendingDoc: string = '';
  dob: string = '';
  state: string = '';
  acctBal: number = 1000;
  account: any;
  stateData: any = [];
  channelData: Array<any> = [];
  productData = [];
  ecData: any = [];
  brancheData: any = [];
  penDocData: any = [];

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
    console.log('ionViewDidLoad DetailsPage');
    this.stateData = this.appdata.getState();
    this.channelData = this.appdata.getChannels();
    this.productData = this.appdata.getProducts();
  }

  ionViewDidEnter(){
    this.populateData();
  }

  async populateData() {
    this.account = await this.store.fetchDoc('account_details');

    this.bvn = this.account.bvn;
    this.phoneNum = this.account.phoneNum;
    this.email = this.account.email;
    this.address = this.account.address;
    this.ec = this.account.ec;
    this.rm = this.account.rm;
    this.productCode = this.account.product;
    this.productChange(this.account.product);
    this.channel = this.account.channel;
    this.pendingDoc = this.account.pendingDoc;
    this.dob = this.account.dob;
    this.state = this.account.state;
    this.acctBal = Number(this.account.amount);

    if (this.channel == null || this.channel == '') {
      this.channel = 'SMS';
    }
    if (this.acctBal == null || this.acctBal.toString() == '') {
      this.acctBal = 1000;
    }

    let ecResp = await this.store.fetchDoc('ec');
    this.ecData = ecResp.item;

    if (this.ecData != null) {
      var flg = [];
      this.brancheData = [];
      for (let val of this.ecData)
      {
        if (!flg[val.branchcode] && val.branchname != null)
        {
          flg[val.branchcode] = true;

          if (val.branchname != 'BRANCH')
          {     
            this.brancheData.push({
              branchname: val.branchcode + ' ' + val.branchname.toUpperCase(),
              branchcode: val.branchcode
            });
          }
        }
      }
    }
  }

  productChange(val) {
    this.productCode = val;
    console.log(val);

    var penDocData1 = this.productData.filter((item) => {
      return item.value === val;
    });

    penDocData1.filter((item) => {
      this.storage.set('penDoc', item.docs).then(() => {
        this.storage.get('penDoc').then((val) => {
          this.penDocData = val;
        });
      });
    });
  }

  popover(ev) {
    this.controller.miscPopOver('PopoverPage', ev);
  }

  async next() {
    console.log(this.state);
    if (!this.validate.validateDetails(this.bvn.trim(), this.phoneNum.trim(), this.email.trim(), this.address.trim(), this.ec.trim(), this.rm.trim(), this.productCode.trim(), this.channel, this.pendingDoc, this.dob.trim(), this.state.trim(), this.acctBal)) {
      this.validate.displayMessage();
      return false;
    }
    else {
      this.account.bvn = this.bvn;
      this.account.phoneNum = this.phoneNum;
      this.account.email = this.email;
      this.account.address = this.address;
      this.account.ec = this.ec;
      this.account.rm = this.rm;
      this.account.product = this.productCode;
      this.account.channel = this.channel;
      this.account.pendingDoc = this.pendingDoc;
      this.account.state = this.state;
      this.account.amount = this.acctBal;
      console.log(this.productCode);
      console.log(this.account);

      if (this.productCode == 'SBGEN 29050') {
        this.navCtrl.push('MoredetailsPage');
      }
      else {
        this.navCtrl.push('ConfirmPage', {
          moreInfo: false
        });
        this.account.placeOfBirth = '';
        this.account.maidenName = '';
        this.account.stateOfOrigin = '';
        this.account.lga = '';
        this.account.kinName = '';
        this.account.kinRelationship = '';
      }
      let resp = await this.store.createUpdateDoc(this.account);
      console.log(resp);
    }
  }

}
