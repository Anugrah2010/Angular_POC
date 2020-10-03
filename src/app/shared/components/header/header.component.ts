import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }
  private userSub: Subscription;
  isAuthenticated = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
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
}
