import { Component, OnInit } from '@angular/core';
import { FormModel } from 'src/app/register/form-model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-search',
  templateUrl: './register-search.component.html',
  styleUrls: ['./register-search.component.scss']
})
export class RegisterSearchComponent implements OnInit {
  searchText;
  items;
  getArrayUrl = 'http://localhost:3000/getRegisterArray';


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get(this.getArrayUrl).subscribe((res) => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.items = res;

     });
  }
  routeBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
