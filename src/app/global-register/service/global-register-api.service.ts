import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalRegisterApiService {
    getUrl = 'http://localhost:3000/get';
    postUrl = 'http://localhost:3000/post';

   constructor(private http: HttpClient) {}

   register(object) {
    return this.http.post(this.postUrl, object);
   }

}

