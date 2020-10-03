import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MaterialFormModel } from '../shared/models/materialModel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = 'Welcome to Global eMarket';
  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
