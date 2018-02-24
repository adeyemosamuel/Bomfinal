import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PopoverController } from 'ionic-angular';
@Injectable()
export class ControllerServiceProvider {

  constructor(public http: Http, private popCtrl: PopoverController) {
    console.log('Hello ControllerServiceProvider Provider');
  }

  miscPopOver(val, ev) {
    return this.popCtrl.create(val);
  }

}
