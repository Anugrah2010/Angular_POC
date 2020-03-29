import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
  products: Product[] = [{name: 'Laptop', type: 'IT'},
              {name: 'Car', type: 'Automobile'}];
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  checked = false;
  disabled = false;
  label = 'before';
  boxChecked = false;
  boxDisabled = false;
  color;
  PPU = 1;
  today: number = Date.now();
  constructor(private formBuilder: FormBuilder, private http: HttpClientModule) { }

 ngOnInit(): void {
   this.procure();

  }
  procure() {
    this.procureForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.min(this.today)]],
      units: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      consignment: ['', [Validators.required]],
      express: ['', [Validators.required]]

    });
  }
 onSubmit() {
   console.log(this.procureForm.value);
 }
 isChecked() {
    this.checked = ! this.checked;
 }
 postForm() {
   
 }

}
