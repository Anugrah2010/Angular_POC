import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { interval, Observable, of } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[HttpUrlEncodingCodec]
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
  observable = new Observable(observer =>  {
    observer.next(1);
    setTimeout(() => {
      observer.complete();
    }, 4000);
  });

  constructor(private authService: AuthService, private urlEncoder: HttpUrlEncodingCodec) {}
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
  // encodeUrl() {
  //   this.activatedRoute.url.subscribe((x: UrlSegment[]) => {
  //     this.url = x.join('/'); 
  //   });
  //   console.log(this.activatedRouteSnapshot.url);
  //   console.log(this.routerStateSnapshot.url);
  // }
  callWhenRequired() {
    let firstObservable = interval(1000);
    const secondObservable = firstObservable.pipe(debounce(() => 
      interval(1000)));
      secondObservable.subscribe(() => {
        console.log('')
      });
      
  }
}
