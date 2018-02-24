import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignaturePage } from './signature';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    SignaturePage,
  ],
  imports: [
    IonicPageModule.forChild(SignaturePage),
    SignaturePadModule
  ],
})
export class SignaturePageModule {}
