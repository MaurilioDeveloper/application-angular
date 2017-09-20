"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./app.component");
var spinner_service_1 = require("./spinner/spinner.service");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/publishLast");
var app_spinner_1 = require("./app.spinner");
var app_message_1 = require("./app.message");
// import { saveAs } from 'file-saver';
var AppService = /** @class */ (function () {
    function AppService(spinnerService, http, app, appMessage, loaderService, router) {
        this.spinnerService = spinnerService;
        this.http = http;
        this.app = app;
        this.appMessage = appMessage;
        this.loaderService = loaderService;
        this.router = router;
        this.baseUrl = this.getURL() + '/omega2/api';
    }
    AppService.prototype.getBaseUrl = function () {
        return this.baseUrl;
    };
    AppService.prototype.getURLS3 = function () {
        return this.getURL() + '/omega2/s3/';
    };
    AppService.prototype.getURL = function () {
        var url = 'http://' + document.location.host;
        // Enable production mode unless running locally
        if ('8021' == window.location.port) {
            url = 'http://' + document.location.hostname + ':8020';
        }
        return url;
    };
    AppService.prototype.getURLWebsocket = function () {
        var url = 'ws://' + document.location.host;
        // Enable production mode unless running locally
        if ('8021' == window.location.port) {
            url = 'ws://' + document.location.hostname + ':8020';
        }
        return url;
    };
    AppService.prototype.xPost = function (action, object) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var body = JSON.stringify(object);
        var options = new http_1.RequestOptions({ headers: this.getHeaders() });
        var urlAction = this.baseUrl + "/" + action;
        //TODO vanderson revisar implementação com arquiteto
        urlAction += this.getUrlToken();
        var response = this.http.post(urlAction, body, options).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.handleResponse(data);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner 
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xNoAuthPost = function (action, object) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var body = JSON.stringify(object);
        var options = new http_1.RequestOptions({ headers: this.getHeaders() });
        var urlAction = this.baseUrl + "/noauth/" + action;
        var response = this.http.post(urlAction, body, options).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.handleResponse(data);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner 
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xUpload = function (action, object, file) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action;
        //TODO vanderson revisar implementação com arquiteto
        urlAction += this.getUrlToken();
        var requestObject = JSON.stringify(object);
        var formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("requestObject", new Blob([JSON.stringify(object)], { type: "application/json" }));
        var response = this.http.post(urlAction, formData).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.handleResponse(data);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner 
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xInsert = function (action, object) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action;
        urlAction += this.getUrlToken();
        var body = JSON.stringify(object);
        var options = new http_1.RequestOptions({ headers: this.getHeaders() });
        var response = this.http.post(urlAction, body, options).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.handleResponse(data);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xUpdate = function (action, object) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action;
        urlAction += this.getUrlToken();
        var body = JSON.stringify(object);
        var options = new http_1.RequestOptions({ headers: this.getHeaders() });
        var response = this.http.put(urlAction, body, options).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.handleResponse(data);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xDelete = function (action, id) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action + '/' + id;
        urlAction += this.getUrlToken();
        var response = this.http.delete(urlAction).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.handleResponse(data);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xDeleteWithData = function (action, object) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action;
        urlAction += this.getUrlToken();
        var body = JSON.stringify(object);
        var options = new http_1.RequestOptions({
            body: body,
            method: http_1.RequestMethod.Post,
            headers: this.getHeaders()
        });
        var response = this.http.request(urlAction, options).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.handleResponse(data);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xGet = function (action, id) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action + '/' + id;
        urlAction += this.getUrlToken();
        var response = this.http.get(urlAction).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xSearch = function (action, id) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action + '/' + id;
        urlAction += this.getUrlToken();
        var response = this.http.get(urlAction).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xSearchWithData = function (action, object) {
        var _this = this;
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action;
        urlAction += this.getUrlToken();
        var body = JSON.stringify(object);
        var options = new http_1.RequestOptions({
            body: body,
            method: http_1.RequestMethod.Post,
            headers: this.getHeaders()
        });
        var response = this.http.request(urlAction, options).publishLast().refCount()
            .map(function (res) { return res; })
            .do(function (data) {
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
        return response;
    };
    AppService.prototype.xFileDownload = function (action, id, filename, extension) {
        var _this = this;
        //this.spinnerService.display(true); // enable spinner 
        this.loaderService.display(true); // enable spinner    
        var urlAction = this.baseUrl + "/" + action + '/' + id;
        urlAction += this.getUrlToken();
        this.http.get(urlAction, { responseType: http_1.ResponseContentType.Blob }).publishLast().refCount()
            .map(function (res) { return res; })
            .subscribe(function (data) {
            var file = new Blob([data.blob()]);
            var saveAs = require('file-saver');
            // console.log(saveAs);
            saveAs(file, filename + "_" + new Date().getTime() + "." + extension);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        }, function (err) {
            _this.handleResponse(err);
            _this.logError(err);
            _this.loaderService.display(false); // disable spinner
            //this.spinnerService.display(false); // disable spinner
        });
    };
    AppService.prototype.getSessionUser = function () {
        var userCurrent = JSON.parse(sessionStorage.getItem('currentUser'));
        // console.log(userCurrent);
        return userCurrent;
    };
    /**
     * TODO Vanderson - aprimorar get token - incluindo validacao de token proximo a expiração
     * fazer refresh caso esteja para expirar
     */
    AppService.prototype.getUrlToken = function () {
        var token = "?access_token=" + this.getSessionUser().access_token;
        return token;
    };
    AppService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //  text/html
        var salesman = sessionStorage.getItem('salesman');
        var structure = sessionStorage.getItem('structure');
        if (salesman) {
            /* let obj = Object.create(String.prototype);*/
            var obj = JSON.parse(salesman);
            headers.append('salesman', obj.id);
        }
        if (structure) {
            /* let obj = Object.create(String.prototype);*/
            var obj = JSON.parse(structure);
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
    };
    AppService.prototype.handleResponse = function (data) {
        //console.log(data, data.status);
        if (data.status == 401 || data.status == 0) {
            this.appMessage.showWarning('msg-worn-session-expired-401');
            this.changeTheme();
            this.clearSessionUser();
            // this.doLogout();
            this.loaderService.display(false);
            this.router.navigate(['/login']);
        }
        else if (data.status <= 199) {
            this.appMessage.showError('common-msg-error');
        }
        else if (data.status <= 299) {
            //this.appMessage.showDefaultSuccess();
        }
        else if (data.status == 403) {
            console.log("erro 403", data);
            this.appMessage.showWarning('common-msg-403');
            this.router.navigate(['/home']);
        }
        else if (data.status == 412) {
            this.appMessage.showWarning(data.json().message);
        }
        else {
            // console.log("erro default", data);
            this.appMessage.showError('common-msg-error');
        }
    };
    AppService.prototype.clearSessionUser = function () {
        console.log("sessao limpa");
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('salesman');
        sessionStorage.removeItem('structure');
    };
    /**
    * Faz troca do tema caso o usuario deslogue como RCI e muda para thema default
    * definido como Nissan
   */
    AppService.prototype.changeTheme = function () {
        var item = {};
        var theme = "";
        var var_local_theme = localStorage.getItem(this.app.KEY_LOCAL_STORAGE);
        console.log("var_local_theme", var_local_theme);
        if (var_local_theme === this.app.BRAND_RCI) {
            theme = this.app.BRAND_NISSAN;
            localStorage.setItem(this.app.KEY_LOCAL_STORAGE, this.app.BRAND_NISSAN);
            item["value"] = theme;
            this.app.changeTheme(item);
        }
    };
    AppService.prototype.logError = function (err) {
        console.log("Log: ", err);
    };
    AppService.prototype.hasRole = function (action) {
        var user = this.getSessionUser();
        this.currentUrl = this.router.url;
        if (user) {
            var role = user.authorities.find(function (auth) { return auth.role.trim() === action.trim(); });
            return role ? true : false;
        }
        return false;
    };
    AppService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [spinner_service_1.SpinnerService, http_1.Http, app_component_1.AppComponent,
            app_message_1.AppMessage,
            app_spinner_1.LoaderService, router_1.Router])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map