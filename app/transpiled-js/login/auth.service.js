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
var app_component_1 = require("./../app.component");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
//import { LoaderService } from './../app.spinner';
var http_1 = require("@angular/http");
var app_message_1 = require("./../app.message");
require("rxjs/add/observable/of");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
var app_service_1 = require("./../app.service");
var AuthService = /** @class */ (function () {
    function AuthService(http, appService, app, router, appMessage) {
        this.http = http;
        this.appService = appService;
        this.app = app;
        this.router = router;
        this.appMessage = appMessage;
        this.action = '';
    }
    AuthService.prototype.ngOnInit = function () {
        this.currentUrl = this.router.url;
    };
    AuthService.prototype.isLoggedIn = function () {
        var user = this.appService.getSessionUser();
        if (user) {
            return true;
        }
        return false;
    };
    AuthService.prototype.doLogin = function (login) {
        var _this = this;
        this.action = 'request_token?grant_type=password&username=' + login.user + '&password=' + login.password;
        this.appService.loaderService.display(true); // enable spinner    
        // let body = JSON.stringify( object );
        var options = new http_1.RequestOptions({ headers: this.getHeaders() });
        var urlAction = this.appService.getBaseUrl() + "/" + this.action;
        var obervable = this.http.post(urlAction, null, options)
            .map(function (res) { return res; })
            .do(function (data) {
            _this.appService.loaderService.display(false); // disable spinner
            sessionStorage.setItem('currentUser', JSON.stringify(data.json()));
        }, function (err) {
            var str = JSON.parse(err._body);
            _this.appMessage.showWarning(str.error_description);
            _this.appService.loaderService.display(false); // disable spinner
        });
        sessionStorage.removeItem('salesman');
        return obervable;
    };
    AuthService.prototype.doLogout = function () {
        var _this = this;
        var action = undefined;
        this.appService.loaderService.display(true);
        var currenteUser = sessionStorage.getItem('currentUser');
        console.log(currenteUser);
        action = 'securityService/logout' + this.appService.getUrlToken();
        this.appService.loaderService.display(true); // enable spinner    
        // let body = JSON.stringify( object );
        var options = new http_1.RequestOptions({ headers: this.getHeaders() });
        var urlAction = this.appService.getBaseUrl() + "/" + action;
        console.log("urlAction", urlAction);
        this.appService.changeTheme();
        this.appService.clearSessionUser();
        var obervable = this.http.post(urlAction, null, options)
            .map(function (res) { return res; })
            .do(function (data) {
            console.log("logout efetuado");
            _this.appService.loaderService.display(false); // disable spinner
            _this.router.navigate(['/login']);
        }, function (err) {
            console.log("erro no logout efetuado");
            _this.appService.handleResponse(err);
            _this.appService.loaderService.display(false); // disable spinner
            _this.router.navigate(['/login']);
        });
        return obervable;
    };
    AuthService.prototype.setSalesMan = function (salesman) {
        sessionStorage.setItem('salesman', JSON.stringify(salesman));
    };
    AuthService.prototype.setStructure = function (structure) {
        sessionStorage.setItem('structure', JSON.stringify(structure));
    };
    AuthService.prototype.setOldTheme = function (theme) {
        sessionStorage.setItem('oldTheme', JSON.stringify(theme));
    };
    AuthService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Basic b21lZ2EyLXRydXN0ZWQtY2xpZW50Om9tZWdhMi10cnVzdGVkLWNsaWVudC1zZWNyZXQ=');
        headers.append('Content-Type', 'application/json');
        var salesman = sessionStorage.getItem('salesman');
        var structure = sessionStorage.getItem('structure');
        var oldTheme = sessionStorage.getItem('oldTheme');
        /* headers.append('Access-Control-Allow-Origin', 'http://localhost');
           headers.append('Access-Control-Allow-Origin', '*');
           headers.append('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
           headers.append('Access-Control-Allow-Headers', 'authorization, x-requested-with, Content-Type, origin, accept, client-security-token');
        */
        //console.log(headers);
        return headers;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_service_1.AppService,
            app_component_1.AppComponent, router_1.Router, app_message_1.AppMessage])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=auth.service.js.map