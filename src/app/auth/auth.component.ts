import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseModel } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true ;
  isLoading = false;
  error = null;
  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservables: Observable<AuthResponseModel>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservables = this.authService.signin(email, password);
    } else {
    this.authService.signup(email, password);
    }
    authObservables.subscribe(
    res => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['/']);
    },
    err => {
      console.log(err);
      this.error = err;
      this.isLoading = false;
    }
    );
    form.reset();
    this.error = null;
  }

}

