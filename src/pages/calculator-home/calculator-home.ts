import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-calculator-home',
  templateUrl: 'calculator-home.html',
})
export class CalculatorHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  financeLease() {
    console.log("Clicked Finance Lease");
    this.navCtrl.push('FinancePage');
  }

  invoiceDiscountingFacility() {
    console.log("Clicked Invoice Discounting Facility");
    this.navCtrl.push('InvoicePage');
  }

    localPurchaseOrder() {
      console.log("Clicked Local Purchase Order");
      this.navCtrl.push('LocalPage');
    }

    schoolShortTermLoan() {
      console.log("Clicked School Short Term Loan");
      this.navCtrl.push('SchoolPage');
    }

    overdraftMarketTraders() {
      console.log("Clicked Overdraft for Market Traders");
      this.navCtrl.push('OverdraftPage');
    }

    smeOverdraft() {
      console.log("Clicked SME Overdraft");
      this.navCtrl.push('SmePage');
    }

    napel() {
      console.log("Clicked NAF Personal Loan (NAPEL)");
      this.navCtrl.push('NapelPage');
    }

    laper() {
      console.log("Clicked Personal Loan (HBL Staff)");
      this.navCtrl.push('LaperPage');
    }

    locar() {
      console.log("Clicked Auto Loan (LOCAR)");
      this.navCtrl.push('LocarPage');
    }
    
    cusad() {
      console.log("Clicked  Salary Advance (CUSAD)");
      this.navCtrl.push('CusadPage');
    }

    lajub() {
      console.log("Clicked Home Appliances (LAJUB)");
      this.navCtrl.push('LajubPage');
    }

    louni() {
      console.log("Clicked  Tertiary Cluster (LOUNI)");
      this.navCtrl.push('LouniPage');
    }

    fcd(){
      console.log("Foreign Deposit")
      this.navCtrl.push('FxcalcPage')
    }

    lcd(){
      console.log("Local Deposit")
      this.navCtrl.push('LcdPage')
    }

    customer(){
      console.log("Customer Loan") 
      this.navCtrl.push('CustomerPage')
    }

  }
