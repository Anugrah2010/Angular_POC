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
    return items.filter( it => {
     // tslint:disable-next-line:max-line-length
     if (it.company.toLowerCase().includes(searchText) || it.country.toLowerCase().includes(searchText) || it.industry.toLowerCase().includes(searchText) || it.email.toLowerCase().includes(searchText) || it.contact.toLowerCase().includes(searchText)) {
        return it;
    }
  });
  //   items.filter (x => {
  //     const val = Object.values(x);
  //     this.printVAL(val);
  //     if (val.filter((y: string) => {
  //       y.toLowerCase().includes(searchText);
  //      }).length !== 0) {
  //      console.log(val.indexOf(searchText));
  //      return x ;
  //    }
  //    });
  //  }
  //  printVAL(x: any[]) {
  //     console.log(x);
  //  }
}
}
