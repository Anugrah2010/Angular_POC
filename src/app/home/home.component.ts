import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MaterialFormModel } from './materialModel';

interface Product {
  name: string;
  type: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  procureForm: FormGroup;
  products: Product[] = [{name: 'ECG monitor', type: 'Information Technology'},
                         {name: 'v8 engine', type: 'Automobile'},
                         {name: 'Hand sanitizer', type: 'Chemical'},
                         {name: '60V Battery', type: 'Energy and Transmission'},
                         {name: 'Thermometers', type: 'Electronics'},
                         {name: 'Electric cables', type: 'Energy and Transmission'},
                         {name: 'Disinfectant', type: 'Chemical'},
                         ];
  geography: string[] = ['Asia', 'Europe', 'North America', 'South America', 'Australia', 'Africa'];
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  checked = false;
  disabled = false;
  label = 'before';
  boxChecked = false;
  boxDisabled = false;
  color;
  PPU = 1;
  today: number = Date.now();
  getUrl = 'http://localhost:3000/get';
  postUrl = 'http://localhost:3000/post';
  respData = 'click button to get data from server';
  postData ;
  successMsg: string;
  delayReset = 1000;
  barActive = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

 ngOnInit(): void {
   this.createProcureForm();
   this.successMsg = '';
  }
  createProcureForm() {
    this.procureForm = this.formBuilder.group({
      company : ['', [ Validators.required]],
      productName: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.min(this.today)]],
      units: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      geography: ['', [Validators.required]],
      logistics: ['required', [Validators.required]],
      express: ['', [Validators.required]]

    });
  }
 onSubmit() {
  this.barActive = true;
  console.log(this.procureForm.value);
  this.postRequest(this.procureForm.value);
  this.successMsg = 'Procurement request has been submitted !!';
  setTimeout(() => { this.resetForm(); }, this.delayReset);
 }
  resetForm() {
    this.barActive = false;
    this.procureForm.markAsUntouched();
    this.procureForm.reset();
  }
 isChecked() {
    this.checked = ! this.checked;
    if (this.checked) {
      this.procureForm.controls.payment.setValue('online');
    } else { this.procureForm.controls.payment.setValue('offline'); }
 }
  postRequest(object: MaterialFormModel) {

    return this.http.post(this.postUrl, object)
    .subscribe((response) => {
      this.postData = JSON.stringify(response);
      console.log('This is the post response ' + this.postData);
    });
  }

//  dateCheck(){
//    this.today  ;
//  }

}
