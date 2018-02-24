import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import PouchDB from 'pouchdb';

@Injectable()
export class StorageService {
  db: any;

  constructor(
    private device: Device
  ) {
    console.log('Hello StorageProvider Provider');
    this.db = new PouchDB('heritageBOM');
    this.initializeData();
  }

  async createUpdateDoc(doc) {
    try {
      const response = await this.db.put(doc);
      return response;
    }
    catch(err) {
      console.log(err);
      return 'Failed';
    }
  }

  async fetchDoc(docId) {
    try {
      const response = await this.db.get(docId);
      return response;
    }
    catch(err) {
      console.log(err);
      return 'Failed';
    }
  }

  async deleteDoc(doc) {
    try {
      const response = await this.db.remove(doc);
      return response;
    }
    catch(err) {
      console.log(err);
      return 'Failed';
    }
  }

  async bulkCreateDoc(arrayDoc) {
    try {
      const response = await this.db.bulkDocs(arrayDoc);
      return response;
    }
    catch(err) {
      console.log(err);
      return 'Failed';
    }
  }

  async initializeData() {
    let loginDoc = {
      _id: 'loginuser',
      username: '',
      harsh: '',
      noOfAccounts: '',
      location: ''
    };

    let deviceDoc = {
      _id: 'device',
      uuid: this.device.uuid,
      model: this.device.model,
      os: this.device.platform
    };

    let leaderboardDoc = {
      _id: 'leaderboard',
      item: []
    };

    let accountDoc = {
      _id: 'account_details',
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      maritalStatus: '',
      occupation: '',
      dob: '',
      bvn: '',
      phoneNum: '',
      email: '',
      address: '',
      state: '',
      ec: '',
      rm: '',
      product: '',
      channel: '',
      pendingDoc: '',
      amount: '',
      placeOfBirth: '',
      maidenName: '',
      stateOfOrigin: '',
      lga: '',
      kinName: '',
      kinRelationship: '',
      image: '',
      signature: ''
    };

    let ecDoc = {
      _id: 'ec',
      item: []
    };

    await this.bulkCreateDoc([loginDoc, deviceDoc, leaderboardDoc, accountDoc, ecDoc]);
  }


  // Clear storage
  async clearStorage(val) {
    let account = await this.fetchDoc('account_details');
    account.title = '';
    account.firstName = '';
    account.middleName = '';
    account.lastName = '';
    account.gender = '';
    account.maritalStatus = '';
    account.occupation = '';
    account.dob = '';
    account.bvn = '';
    account.phoneNum = '';
    account.email = '';
    account.address = '';
    account.state = '';
    account.ec = '';
    account.rm = '';
    account.product = '';
    account.channel = '';
    account.pendingDoc = '';
    account.amount = '';
    account.placeOfBirth = '';
    account.maidenName = '';
    account.stateOfOrigin = '';
    account.lga = '';
    account.kinName = '';
    account.kinRelationship = '';
    account.image = '';
    account.signature = '';

    let _resp = await this.createUpdateDoc(account);
    console.log(_resp);

    let user = await this.fetchDoc('loginuser');

    if (val == 'out') {
      user.harsh = '';
      user.harsh = '';
      user.noOfAccounts = '';
      user.location = '';

      let leaderboard = await this.fetchDoc('leaderboard');
      leaderboard.item = [];

      let ec = await this.fetchDoc('ec');
      ec.item = []

      let resp = await this.bulkCreateDoc([user, leaderboard, ec]);
      console.log(resp)
    }
  }

}
