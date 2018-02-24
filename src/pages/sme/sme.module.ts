import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmePage } from './sme';

@NgModule({
  declarations: [
    SmePage,
  ],
  imports: [
    IonicPageModule.forChild(SmePage),
  ],
})
export class SmePageModule {}
