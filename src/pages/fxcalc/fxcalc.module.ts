import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FxcalcPage } from './fxcalc';

@NgModule({
  declarations: [
    FxcalcPage,
  ],
  imports: [
    IonicPageModule.forChild(FxcalcPage),
  ],
})
export class FxcalcPageModule {}
