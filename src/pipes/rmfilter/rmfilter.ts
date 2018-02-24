import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'Rmfilter'
})
@Injectable()
export class Rmfilter {
  /*
    Takes a value and makes it lowercase.
   */
  transform(ecData: any[], args: string): any {
    if (ecData != null) {
      return ecData.filter(res => res.branchcode === args);
    }
  }
}
