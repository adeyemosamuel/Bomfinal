import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverdraftPage } from './overdraft';

@NgModule({
  declarations: [
    OverdraftPage,
  ],
  imports: [
    IonicPageModule.forChild(OverdraftPage),
  ],
})
export class OverdraftPageModule {}
