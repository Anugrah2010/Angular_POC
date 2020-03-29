import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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
  products: Product[] = [{name: '17 inch Monitor', type: 'Information Technology'},
              {name: 'v8 engine', type: 'Automobile'},
            {name: 'Hand sanitizer', type: 'Chemical'},
            {name: '60V Battery', type: 'Energy'},
            {name: 'Thermometers', type: 'Electronics'}];
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
  respData = 'click button to get data from server';
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

 ngOnInit(): void {
   this.createProcureForm();

  }
  createProcureForm() {
    this.procureForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.min(this.today)]],
      units: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      consignment: ['domestic', [Validators.required]],
      express: ['', [Validators.required]]

    });
  }
 onSubmit() {
   console.log(this.procureForm.value);

 }
 isChecked() {
    this.checked = ! this.checked;
 }
  getRequest() {
      this.http.get(this.getUrl).subscribe( (data: string) => {
      console.log(data);
      this.respData = data;
  });
 }

}
