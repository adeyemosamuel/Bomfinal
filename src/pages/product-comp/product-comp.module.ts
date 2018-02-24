import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCompPage } from './product-comp';

@NgModule({
  declarations: [
    ProductCompPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCompPage),
  ],
})
export class ProductCompPageModule {}
