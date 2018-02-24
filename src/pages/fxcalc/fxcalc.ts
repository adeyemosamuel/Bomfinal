import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-fxcalc',
  templateUrl: 'fxcalc.html',
})
export class FxcalcPage {
p:number=null;
range:string=null; 
r:number=null;
tenure:string=null;
SI;
NI;
isSubmitted:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FxcalcPage');
  }

  calculateInterest(){
    var t;
    if(this.tenure =='tenure1'){
      t = 30/365;
    }
    else if(this.tenure =='tenure2'){
      t = 60/365;
    }
    else if (this.tenure =='tenure3'){
      t = 90/365;
    }
    else if (this.tenure == 'tenure4'){
      t= 180/365;
    }
    else if (this.tenure == 'tenure5'){
      t = 270/365;
    }
   else {
      t= 365/365;
    }
    this.isSubmitted = true;
    this.SI = ((this.p * this.r * t)/100).toFixed(2);
    this.NI = Number(this.p) + Number(this.SI);
  }
}
