import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LcdPage } from './lcd';

@NgModule({
  declarations: [
    LcdPage,
  ],
  imports: [
    IonicPageModule.forChild(LcdPage),
  ],
})
export class LcdPageModule {}
