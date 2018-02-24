import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPage } from './details';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
    PipesModule,
    FormsModule
  ],
})
export class DetailsPageModule {}
