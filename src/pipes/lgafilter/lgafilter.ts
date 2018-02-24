import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'lgafilter'
})
@Injectable()
export class LGAFilter {
  /*
    Takes a value and makes it lowercase.
   */
  transform(lgaData: any[], args: string): any {
    return lgaData.filter(res => res.value === args);
  }
}
