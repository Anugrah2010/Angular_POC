import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
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
  title = 'udemyTraining';
  price;
  products: Product[] = [{name: 'Laptop', type: 'IT'},
              {name: 'Car', type: 'Automobile'}];
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  checked = false;
  disabled = false;
  color;
  myControl = new FormControl();

  constructor(private fb: FormBuilder, private http: HttpClientModule) { }
  procureForm = this.fb.group({
    productName: ['', [Validators.required]],
    model: ['', [Validators.required]],
    price: ['', [Validators.required]],
    units: ['', [Validators.required]],
    payment: ['', [Validators.required]],
    email: ['', [Validators.required]]
  });

  productN = new FormControl('', Validators.required);
  ngOnInit(): void {
  }
 onSubmit(){
   console.log(this.procureForm.value);
 }

}
