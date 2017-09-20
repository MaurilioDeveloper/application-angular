import { AppComponent } from './../app.component';
import { Salesman } from './../simulation/selected_salesman_dialog/dto/salesman.dto';
import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
//import { LoaderService } from './../app.spinner';

import { Http, Response, RequestOptions, Headers, RequestMethod, JsonpModule } from '@angular/http';
import { AppMessage } from './../app.message';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AppService } from './../app.service';
import { Login } from './login.interface';


@Injectable()
export class AuthService {

    action: string = '';
    msg: string;

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    currentUrl: string;

    constructor(private http: Http, public appService: AppService,
        private app: AppComponent, private router: Router, private appMessage: AppMessage) {
    }

    ngOnInit() {
        this.currentUrl = this.router.url;
    }

    isLoggedIn() {
        const user = this.appService.getSessionUser();
        if (user) {
            return true;
        }
        return false;
    }

    doLogin(login: Login): Observable<any> {
        this.action = 'request_token?grant_type=password&username=' + login.user + '&password=' + login.password;

        this.appService.loaderService.display(true); // enable spinner    
        // let body = JSON.stringify( object );
        let options = new RequestOptions({ headers: this.getHeaders() });
        let urlAction = this.appService.getBaseUrl() + "/" + this.action;


        let obervable = this.http.post
            (urlAction, null, options)
            .map((res: any) => res)
            .do(
            (data) => {
                this.appService.loaderService.display(false); // disable spinner
                sessionStorage.setItem('currentUser', JSON.stringify(data.json()));
            },
            err => {
                const str = JSON.parse(err._body);
                this.appMessage.showWarning(str.error_description);
                this.appService.loaderService.display(false); // disable spinner
            }
            );
        sessionStorage.removeItem('salesman');

        return obervable;
    }

    public doLogout(): Observable<any> {
        let action = undefined;
        this.appService.loaderService.display(true);
        let currenteUser = sessionStorage.getItem('currentUser');
        console.log(currenteUser);
        action = 'securityService/logout' + this.appService.getUrlToken();

        this.appService.loaderService.display(true); // enable spinner    
        // let body = JSON.stringify( object );
        let options = new RequestOptions({ headers: this.getHeaders() });
        let urlAction = this.appService.getBaseUrl() + "/" + action;
        console.log("urlAction", urlAction);
        this.appService.changeTheme();
        this.appService.clearSessionUser();
        let obervable = this.http.post
            (urlAction, null, options)
            .map((res: any) => res)
            .do(
            (data) => {
                console.log("logout efetuado");
                this.appService.loaderService.display(false); // disable spinner
                this.router.navigate(['/login']);
            },
            err => {
                console.log("erro no logout efetuado");
                this.appService.handleResponse(err);
                this.appService.loaderService.display(false); // disable spinner
                this.router.navigate(['/login']);
                
            }
            );

        return obervable;
    }

   

    public setSalesMan(salesman: Salesman) {
        sessionStorage.setItem('salesman', JSON.stringify(salesman));
    }

    public setStructure(structure: String) {
        sessionStorage.setItem('structure', JSON.stringify(structure));
    }

    public setOldTheme(theme: String) {
        sessionStorage.setItem('oldTheme', JSON.stringify(theme));
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic b21lZ2EyLXRydXN0ZWQtY2xpZW50Om9tZWdhMi10cnVzdGVkLWNsaWVudC1zZWNyZXQ=');
        headers.append('Content-Type', 'application/json');


        let salesman = sessionStorage.getItem('salesman');
        let structure = sessionStorage.getItem('structure');
        let oldTheme = sessionStorage.getItem('oldTheme');

        /* headers.append('Access-Control-Allow-Origin', 'http://localhost');
           headers.append('Access-Control-Allow-Origin', '*');
           headers.append('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
           headers.append('Access-Control-Allow-Headers', 'authorization, x-requested-with, Content-Type, origin, accept, client-security-token');
        */

        //console.log(headers);
        return headers;
    }



}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/