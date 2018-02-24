import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by/order-by';
import { Rmfilter } from './rmfilter/rmfilter';
import { LGAFilter } from './lgafilter/lgafilter';
@NgModule({
	declarations: [OrderByPipe,
		Rmfilter,
    LGAFilter],
	imports: [],
	exports: [OrderByPipe,
		Rmfilter,
    LGAFilter]
})
export class PipesModule {}
