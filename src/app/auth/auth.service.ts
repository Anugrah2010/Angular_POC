import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators/';
import {     UserModel } from './userModel';

export interface AuthResponseModel {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable ({ providedIn: 'root'})
export class AuthService {
    user = new Subject<UserModel>();
    constructor(private http: HttpClient) {}

    signup(em: string, pwd: string) {
        return this.http.post<AuthResponseModel>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXh8BXDAKDmu4jLEV0ZzteMTvkHDa-8q8',
            {
                email: em,
                password: pwd,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError)
        , tap(res => {
            this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
            })
            );
    }

    signin(em: string, pwd: string) {
        return this.http.post<AuthResponseModel>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXh8BXDAKDmu4jLEV0ZzteMTvkHDa-8q8',
            {
                email: em,
                password: pwd,
                returnSecureToken: true
            }
        ).pipe(catchError( this.handleError), tap(res => {
            this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
            })
);
    }
    handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + + expiresIn * 1000 );
        const user = new UserModel(email, userId, token, expirationDate);
        this.user.next(user);
    }
    private handleError(err: HttpErrorResponse) {
        let errorMsg = 'An unknown error has occured';
        if (!err.error || !err.error.error) {
                return throwError(errorMsg);
            }
        switch (err.error.error.message) {
                case 'EMAIL_NOT_FOUND' :
                    errorMsg = 'email not found';
                    break;
                case 'INVALID_PASSWORD':
                    errorMsg = 'Invalid password.Please enter a valid password.';
                    break;
                case 'USER_DISABLED':
                    errorMsg = 'Your account has been disabled';
                    break;
              }
        return throwError(errorMsg);
    }
}
