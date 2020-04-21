import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AuthResponseModel {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}
@Injectable ({ providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(em: string, pwd: string) {
        return this.http.post<AuthResponseModel>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXh8BXDAKDmu4jLEV0ZzteMTvkHDa-8q8',
            {
                email: em,
                password: pwd,
                returnSecureToken: true
            }
        );
    }
}