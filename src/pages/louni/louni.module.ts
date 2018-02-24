import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LouniPage } from './louni';

@NgModule({
  declarations: [
    LouniPage,
  ],
  imports: [
    IonicPageModule.forChild(LouniPage),
  ],
})
export class LouniPageModule {}
