import { Injectable } from '@angular/core';
import { ToastController, ToastOptions, LoadingController, PopoverController } from 'ionic-angular';

@Injectable()
export class ControllerServiceProvider2 {

  constructor(
    private toast: ToastController,
    private loader: LoadingController,
    private popCtrl: PopoverController
  ) {
    console.log('Hello ControllerService2 Provider');
  }

  toastCtrl(toastMsg, toastPosition, closeButton){
    let options: ToastOptions = {
      message: toastMsg,
      position: toastPosition,
      showCloseButton: closeButton,
      duration: 3000
    }

    this.toast.create(options).present();
  }

  loadCtrl(val){
    return this.loader.create({
      content: val
    });
  }

  popOver(val) {
    return this.popCtrl.create(val);
  }

  miscPopOver(val, ev) {
    let pop = this.popCtrl.create(val);
    pop.present({ev : ev});
  }

}