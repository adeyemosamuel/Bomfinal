import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculatorHomePage } from './calculator-home';

@NgModule({
  declarations: [
    CalculatorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CalculatorHomePage),
  ],
})
export class CalculatorHomePageModule {}
