import { Component, OnInit } from '@angular/core';
import {FormModel} from './form-model';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
    model: FormModel;
    diagnostic: FormModel = {company: 'A', industry: 'B', country: 'C', email: 'D', contact: 'E'};
    Json: string = JSON.stringify(this.diagnostic);
    email;
    contact;
    entryForm = this.fb.group({
      company: ['', [Validators.required, Validators.pattern]],
      country: ['', Validators.required],
      industry: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });

  ngOnInit(): void {
  }
  reset() {
    this.entryForm.reset();
  }
  show(email: HTMLInputElement, contact: HTMLInputElement) {
    this.email = email.value;
    this.contact = contact.value;

  }
  onSubmit() {
    console.warn(this.entryForm.value);
    return this.Json = JSON.stringify(this.entryForm.value);
  }

  redirectToSearch(){
     this.router.navigate(['/search']);
  }
}
