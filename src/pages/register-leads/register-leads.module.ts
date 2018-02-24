import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterLeadsPage } from './register-leads';

@NgModule({
  declarations: [
    RegisterLeadsPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterLeadsPage),
  ],
})
export class RegisterLeadsPageModule {}
