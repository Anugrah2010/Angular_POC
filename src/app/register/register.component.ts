import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormModel} from './form-model';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryModel } from './country-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }
    model: FormModel;
    diagnostic: FormModel = {company: 'A', industry: 'B', country: 'C', email: 'D', contact: 'E'};
    Json: string = JSON.stringify(this.diagnostic);
    postRegisterUrl = 'http://localhost:3000/postRegisterUrl';
    postResp;
    email;
    contact;
    countryAPIurl = 'http://localhost:3000/getCountries';
    countryArray: CountryModel[] ;

    entryForm = this.fb.group({
      company: ['', [Validators.required]],
      country: ['', Validators.required],
      industry: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });
  // ngOnInit(): void {
  //   this.getCountries();
  // }
  ngAfterViewInit(): void {
    this.getCountries();
  }
  reset() {
    this.entryForm.reset();
  }
  show(email: HTMLInputElement, contact: HTMLInputElement) {
    this.email = email.value;
    this.contact = contact.value;

  }
  onSubmit() {
    this.http.post(this.postRegisterUrl, this.entryForm.value).subscribe((res) => {
      this.postResp = res;
      console.log(this.postResp);
    });
    this.reset();
    console.warn(this.entryForm.value);
    return this.Json = JSON.stringify(this.entryForm.value);

  }

  redirectToSearch() {
     this.router.navigate(['/search']);
  }

  getCountries() {
    this.http.get(this.countryAPIurl).subscribe((res: CountryModel[]) => {
      console.log(res);
      this.countryArray = res;
    });
  }
}
