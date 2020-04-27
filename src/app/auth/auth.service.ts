import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError, Subject, BehaviorSubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators/';
import { UserModel } from './userModel';
import { Router } from '@angular/router';

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
    user = new BehaviorSubject<UserModel>(null);
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router) {}

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
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
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
    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;

        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new UserModel(userData.id, userData.id, userData._token, new Date( userData._tokenExpirationDate));
        if (loadedUser.getToken) {
            this.user.next(loadedUser);
            const userExpirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(userExpirationDuration);
        }
    }
    autoLogout(userExpireDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.logout();
        }, userExpireDuration);
    }
}
