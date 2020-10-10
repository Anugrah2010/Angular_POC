import { Component, OnInit, OnDestroy, ViewChild, DoCheck } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {

  constructor(private authService: AuthService, private readonly router: Router) { }
  private userSub: Subscription;
  isAuthenticated = false;
  headerScreenTitle;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }
  ngDoCheck() {
    this.setHeaderScreenTitle();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();

  }
  logout() {
    this.authService.logout();
  }

  someMethod() {
    this.trigger.openMenu();
  }
  setHeaderScreenTitle() {
    const route = this.router.url;
    console.error(route);
    switch (route) {
      case '/home': this.headerScreenTitle = 'Dashboard';
                    break;
      case '/global': this.headerScreenTitle = 'Global register';
                      break;
      case '/search': this.headerScreenTitle = 'Global search';
                      break;
      case '/search/proSearch': this.headerScreenTitle = 'Buyer search';
                                break;
      case '/search/regSearch': this.headerScreenTitle = 'Seller search';

    }
  }
}
