import { Component, OnInit } from '@angular/core';
import { FormModel } from 'src/app/register/form-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-search',
  templateUrl: './register-search.component.html',
  styleUrls: ['./register-search.component.scss']
})
export class RegisterSearchComponent implements OnInit {
  searchText;
  public items: FormModel[];
  public item1;
  public item2;
  public item3;
  
  constructor(private router: Router, private route: ActivatedRoute) {
    this.item1 = new FormModel('TCS', 'India', 'Information Technology', 'tcs@tcs.com', '9981194654');
    this.item2 = new FormModel('Samsung', 'SKorea', 'Electronics', 'sam@sam.com', '1234567891');
    this.item3 = new FormModel('TataPower', 'India', 'Energy', 'power@tata.com', '9876543219');

  }

  ngOnInit(): void {
    this.items = [this.item1, this.item2, this.item3] ;
    console.log(this.items);

  }
  routeBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
