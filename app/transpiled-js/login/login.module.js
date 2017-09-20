"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var flex_layout_1 = require("@angular/flex-layout");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var translate_module_1 = require("./../translate/translate.module");
var forgot_password_dialog_1 = require("./../forgot_password_dialog/forgot_password.dialog");
var auth_denied_1 = require("./auth-denied");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("./auth-guard.service");
var auth_service_1 = require("./auth.service");
var login_component_1 = require("./login.component");
var loginRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'login/:brand', component: login_component_1.LoginComponent },
    { path: 'denied', component: auth_denied_1.AuthDeniedComponent },
    { path: '', component: login_component_1.LoginComponent, pathMatch: 'full' },
];
exports.LoginRoutes = {
    //  routes: RouterModule.forRoot(appRoutes),
    components: [
        login_component_1.LoginComponent,
        auth_denied_1.AuthDeniedComponent
    ]
};
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(loginRoutes), translate_module_1.TranslateModule, material_1.MaterialModule,
                forms_1.FormsModule, flex_layout_1.FlexLayoutModule
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: [
                auth_guard_service_1.AuthGuard,
                auth_service_1.AuthService
            ],
            declarations: [
                forgot_password_dialog_1.ForgotPasswordDialog
            ],
            bootstrap: [
                forgot_password_dialog_1.ForgotPasswordDialog
            ]
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=login.module.js.map