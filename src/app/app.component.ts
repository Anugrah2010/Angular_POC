import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url: string;
  message = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Message received'), 1000),
    setTimeout(() => reject('Message rejected'))});
  set = new Set();
  map = new Map();
  weakSet = new WeakSet();
  weakMap = new WeakMap();
  result = prompt('title', 'default');
  observable = new Observable(observer =>  {
    observer.next(1);
    setTimeout(() => {
      observer.complete();
    }, 4000);
  });

  constructor(private authService: AuthService, private routerState: RouterState, private activatedRoute: ActivatedRoute,
              private routerStateSnapshot: RouterStateSnapshot, private activatedRouteSnapshot: ActivatedRouteSnapshot,
              private urlEncoder: HttpUrlEncodingCodec) {}
  ngOnInit() {
    this.authService.autoLogin();
    this.message.then(() => console.log('Promise is fulfilled'),
    () => console.log('Promise is rejected'))
    .catch()
    .finally(() => {
      console.log('India is great !');
  });
  }
  async asyncfunction() {
    const delay = await this.message;
    return delay;
  }
  encodeUrl() {
    this.activatedRoute.url.subscribe((x: UrlSegment[]) => {
      this.url = x.join('/'); 
    });
    console.log(this.activatedRouteSnapshot.url);
    console.log(this.routerStateSnapshot.url);
  }
}
