import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeadsDetailsPage } from './leads-details';

@NgModule({
  declarations: [
    LeadsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LeadsDetailsPage),
  ],
})
export class LeadsDetailsPageModule {}
