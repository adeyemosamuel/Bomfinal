import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ControllerService } from '../../providers/controller/controller';
import { StorageService } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  username: string = '';
  numOfAccts: number;
  showBoardMsg: boolean = false;
  showBoard: boolean = true;
  boardData: any = [];

  constructor(
    public navCtrl: NavController,
    private controller: ControllerService,
    private store: StorageService
  ) {
  }

  ionViewDidLoad() {
    this.initializeData();
  }

  async initializeData() {
    const user = await this.store.fetchDoc('loginuser');
    const resp = await this.store.fetchDoc('leaderboard');

    if (user != 'Failed') {
      this.username = user.username;
      this.numOfAccts = Number(user.noOfAccounts);
    }

    if (resp != 'Failed') {
      this.boardData = resp.item;
      if (this.boardData == null) {
        this.showBoardMsg = true;
        this.showBoard = false;
      }
      else {
        this.showBoardMsg = false;
        this.showBoard = true;
      }
    }
  }

  gotoBio(){
    this.navCtrl.push('BioPage');
  }

  popover(val) {
    this.controller.miscPopOver('PopoverPage', val);
  }

  back() {
    this.navCtrl.pop();
  }

}
