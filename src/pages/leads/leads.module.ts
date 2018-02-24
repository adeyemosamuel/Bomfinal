import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeadsPage } from './leads';

@NgModule({
  declarations: [
    LeadsPage,
  ],
  imports: [
    IonicPageModule.forChild(LeadsPage),
  ],
})
export class LeadsPageModule {}
