import { Component, OnInit } from '@angular/core';
import { FormModel } from '../register/form-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText;
  public items: FormModel[];
  public item1;
  public item2;
  public item3;

    constructor() {
      this.item1 = new FormModel('TCS', 'India', 'Information Technology', 'tcs@tcs.com', '9981194654');
      this.item2 = new FormModel('Samsung', 'SKorea', 'Electronics', 'sam@sam.com', '1234567891');
      this.item3 = new FormModel('TataPower', 'India', 'Mining', 'power@tata.com', '9876543219');
    }

  ngOnInit(): void {
    this.items = [this.item1, this.item2, this.item3] ;
    console.log(this.items);
  }
}
