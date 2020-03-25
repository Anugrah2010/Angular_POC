import { Pipe, PipeTransform } from '@angular/core';
import { FormModel } from './register/form-model';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: FormModel[], searchText: string): any {

    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    // return items.filter( it => {
    //   return it.toLowerCase().includes(searchText);
    items.filter (x => {
      const val = Object.values(x);
      this.printVAL(val);
      if (val.filter((y: string) => {
        y.toLowerCase().includes(searchText);
       }).length !== 0) {
       console.log(val.indexOf(searchText));
       return x ;
     }
     });
   }
   printVAL(x: any[]) {
      console.log(x);
   }
}

