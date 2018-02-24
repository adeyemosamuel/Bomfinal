import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingProvider } from '../../providers/landing/landing';
import { Storage } from '@ionic/storage';
import { ServerService } from '../../providers/server/server';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  loading: any;
  Username: string = '';
  Password: string = '';
  LoginForm: FormGroup;
  successLogin: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private API: LandingProvider,
    public loadingCtrl: LoadingController,
    private store: Storage,
    private server: ServerService, ) {
    this.LoginForm = formBuilder.group({
      Username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      Password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  async Login() {
    this.loading = this.loadingCtrl.create({
      spinner: "circles",
      content: 'Please wait....',
      // dismissOnPageChange: true,
      duration: 3000
    });
    this.loading.present();

    // let body = {
    //   Username: 'morayo.temi-bello',
    //   Password: 'chigbo'
    // };

    // try {
    //   let response = await this.server.processData(body, '/login');
    //   console.log(response);
    //   this.LoginForm = response;

    // } catch (err) {
    //   console.log(err);
    // }
    this.store.set("Username", this.Username);
    this.store.set("Password", this.Password);
    this.loading.dismiss();
    this.navCtrl.push('ProductsPage');


    
  }
  //store login details in local storage
  saveLoginInfo(Username, Password) {
    if (this.successLogin) {
      this.store.set("Username", Username);
      this.store.set("Password", Password);
    } else {
      this.store.remove("UserName");
      this.store.remove("Password");
      //to clear storage
      this.store.clear();

      console.log('saveLoginInfo');
    }


  }


}







