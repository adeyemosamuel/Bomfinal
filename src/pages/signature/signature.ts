import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
  signature: string = '';
  isDrawing = false;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'penColor': '#000000',
    'canvasWidth': 300,
    'canvasHeight': 400
  };

  constructor(public viewCtrl: ViewController, private storage: Storage) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaturePage');

    this.signaturePad.clear();
    this.storage.get('mandate').then((val) => {
      this.signature = String(val);
    });
  }

  drawStart() {
    this.isDrawing = true;
  }

  drawComplete() {
    this.isDrawing = false;
  }

  save() {
    this.signature = this.signaturePad.toDataURL();
    this.storage.set('mandate', this.signaturePad.toDataURL()).then(()=>{
      this.viewCtrl.dismiss(this.signaturePad.toDataURL());
      this.signaturePad.clear();
    });
  }

  clear() {
    this.signaturePad.clear();
  }

  closePad() {
    this.signaturePad.clear();
    this.viewCtrl.dismiss('cancel');
  }
}
