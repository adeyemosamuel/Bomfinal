import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoredetailsPage } from './moredetails';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MoredetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoredetailsPage),
    PipesModule
  ],
})
export class MoredetailsPageModule {}
