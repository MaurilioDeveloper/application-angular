import { AppComponent } from './app.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { OnInit, EventEmitter } from '@angular/core';
import { Salesman } from './simulation/selected_salesman_dialog/dto/salesman.dto';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod, JsonpModule, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishLast';
import { LoaderService } from './app.spinner';

import { AppMessage } from './app.message';
// import { saveAs } from 'file-saver';

@Injectable()
export class AppService {
    private baseUrl: string;
    public currentUrl: string;

    constructor(private spinnerService: SpinnerService, private http: Http, private app: AppComponent,
        private appMessage: AppMessage,
        public loaderService: LoaderService, private router: Router) {
        this.baseUrl = this.getURL() + '/omega2/api';
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }


    public getURLS3(): string {
        return this.getURL() + '/omega2/s3/';
    }

    public getURL(): string {
        let url = 'http://' + document.location.host;
        // Enable production mode unless running locally
        if ('8021' == window.location.port) {
            url = 'http://' + document.location.hostname + ':8020';
        }
        return url;
    }

    public getURLWebsocket(): string {
        let url = 'ws://' + document.location.host;
        // Enable production mode unless running locally
        if ('8021' == window.location.port) {
            url = 'ws://' + document.location.hostname + ':8020';
        }
        return url;
    }

    public xPost(action: string, object: any): Observable<any> {
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    


        let body = JSON.stringify(object);
        let options = new RequestOptions({ headers: this.getHeaders() });
        let urlAction = this.baseUrl + "/" + action;
        //TODO vanderson revisar implementação com arquiteto
        urlAction += this.getUrlToken();

        let response = this.http.post(urlAction, body, options).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.handleResponse(data);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner 
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xNoAuthPost(action: string, object: any): Observable<any> {
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    


        let body = JSON.stringify(object);
        let options = new RequestOptions({ headers: this.getHeaders() });
        let urlAction = this.baseUrl + "/noauth/" + action;

        let response = this.http.post(urlAction, body, options).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.handleResponse(data);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner 
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xUpload(action: string, object: any, file: File): Observable<any> {
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    


        let urlAction = this.baseUrl + "/" + action;
        //TODO vanderson revisar implementação com arquiteto
        urlAction += this.getUrlToken();

        let requestObject = JSON.stringify(object);

        let formData: any = new FormData();

        formData.append("file", file, file.name);
        formData.append("requestObject", new Blob([JSON.stringify(object)], { type: "application/json" }));

        let response = this.http.post(urlAction, formData).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.handleResponse(data);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner 
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xInsert(action: string, object: any): Observable<any> {

        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action;

        urlAction += this.getUrlToken();

        let body = JSON.stringify(object);
        let options = new RequestOptions({ headers: this.getHeaders() });
        let response = this.http.post(urlAction, body, options).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.handleResponse(data);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xUpdate(action: string, object: any): Observable<any> {
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action;

        urlAction += this.getUrlToken();

        let body = JSON.stringify(object);
        let options = new RequestOptions({ headers: this.getHeaders() });
        let response = this.http.put(urlAction, body, options).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.handleResponse(data);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;

    }

    public xDelete(action: string, id: number): Observable<any> {
        //this.spinnerService.display(true); // enable spinner
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action + '/' + id;

        urlAction += this.getUrlToken();

        let response = this.http.delete(urlAction).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.handleResponse(data);

                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);

                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xDeleteWithData(action: string, object: any): Observable<any> {

        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action;

        urlAction += this.getUrlToken();

        let body = JSON.stringify(object);
        let options = new RequestOptions({
            body: body,
            method: RequestMethod.Post,
            headers: this.getHeaders()
        });
        let response = this.http.request(urlAction, options).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.handleResponse(data);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xGet(action: string, id: any): Observable<any> {
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action + '/' + id;
        urlAction += this.getUrlToken();
        let response = this.http.get(urlAction).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xSearch(action: string, id: any): Observable<any> {

        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action + '/' + id;

        urlAction += this.getUrlToken();
        let response = this.http.get(urlAction).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);
                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }

    public xSearchWithData(action: string, object: any): Observable<any> {
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action;

        urlAction += this.getUrlToken();
        let body = JSON.stringify(object);
        let options = new RequestOptions({
            body: body,
            method: RequestMethod.Post,
            headers: this.getHeaders()
        });
        let response = this.http.request(urlAction, options).publishLast().refCount()
            .map((res: any) => res)
            .do(
            (data) => {

                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);

                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            }
            );
        return response;
    }


    public xFileDownload(action: string, id: any, filename: string, extension: string) {
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    

        let urlAction = this.baseUrl + "/" + action + '/' + id;

        urlAction += this.getUrlToken();
        this.http.get(urlAction, { responseType: ResponseContentType.Blob }).publishLast().refCount()
            .map((res: any) => res)
            .subscribe(
            (data) => {

                let file = new Blob([data.blob()]);
                let saveAs = require('file-saver');
                // console.log(saveAs);
                saveAs(file, filename + "_" + new Date().getTime() + "." + extension);

                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
            err => {
                this.handleResponse(err);
                this.logError(err);

                this.loaderService.display(false); // disable spinner
                //this.spinnerService.display(false); // disable spinner
            },
        );
    }

    public getSessionUser() {
        let userCurrent = JSON.parse(sessionStorage.getItem('currentUser'));
        // console.log(userCurrent);
        return userCurrent;
    }
    /**
     * TODO Vanderson - aprimorar get token - incluindo validacao de token proximo a expiração
     * fazer refresh caso esteja para expirar
     */

    public getUrlToken() {
        let token = "?access_token=" + this.getSessionUser().access_token;
        return token;
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        //  text/html
        let salesman = sessionStorage.getItem('salesman');
        let structure = sessionStorage.getItem('structure');

        if (salesman) {
            /* let obj = Object.create(String.prototype);*/
            let obj: Salesman = JSON.parse(salesman)
            headers.append('salesman', obj.id);
        }

        if (structure) {
            /* let obj = Object.create(String.prototype);*/
            let obj: string = JSON.parse(structure)
            headers.append('structure', obj);
        }

        /* 
           headers.append('Content-Type', 'application/json');
           headers.append('Access-Control-Allow-Origin', 'http://localhost');
           headers.append('Access-Control-Allow-Origin', '*');
           headers.append('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
           headers.append('Access-Control-Allow-Headers', 'authorization, x-requested-with, Content-Type, origin, accept, client-security-token');
        */

        return headers;
    }

    public handleResponse(data) {
        //console.log(data, data.status);
        if (data.status == 401 || data.status == 0) {//401 (Unauthorized)
            this.appMessage.showWarning('msg-worn-session-expired-401');
            this.changeTheme();
            this.clearSessionUser();
            // this.doLogout();
            this.loaderService.display(false);  
            this.router.navigate(['/login']);
            
        } else if (data.status <= 199) {
            this.appMessage.showError('common-msg-error');
        } else if (data.status <= 299) {
            //this.appMessage.showDefaultSuccess();
        } else if (data.status == 403) {
            console.log("erro 403", data);
            this.appMessage.showWarning('common-msg-403');
            this.router.navigate(['/home']);
        } else if (data.status == 412) {
            this.appMessage.showWarning(data.json().message);
        } else {
           // console.log("erro default", data);
            this.appMessage.showError('common-msg-error');
        }
    }
    public clearSessionUser() {
        console.log("sessao limpa");
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('salesman');
        sessionStorage.removeItem('structure');
    }
    /**
    * Faz troca do tema caso o usuario deslogue como RCI e muda para thema default
    * definido como Nissan
   */
    public changeTheme() {
        let item = {};
        let theme = "";
        let var_local_theme = localStorage.getItem(this.app.KEY_LOCAL_STORAGE);
        console.log("var_local_theme", var_local_theme);
        if (var_local_theme === this.app.BRAND_RCI) {
            theme = this.app.BRAND_NISSAN;
            localStorage.setItem(this.app.KEY_LOCAL_STORAGE, this.app.BRAND_NISSAN);
            item["value"] = theme;
            this.app.changeTheme(item);
        }
    }


    private logError(err: any) {
        console.log("Log: ", err);
    }

    public hasRole(action: string) {
        const user = this.getSessionUser();
        this.currentUrl = this.router.url;

        if (user) {
            let role = user.authorities.find( auth => auth.role.trim() === action.trim());
           
          return role ? true:false;
        }
        return false;
    }
  

}
