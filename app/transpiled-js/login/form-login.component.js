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
var app_service_1 = require("./../app.service");
var forgot_password_dialog_1 = require("./../forgot_password_dialog/forgot_password.dialog");
var material_1 = require("@angular/material");
var app_component_1 = require("./../app.component");
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var router_1 = require("@angular/router");
var app_message_1 = require("./../app.message");
var FormLoginComponent = /** @class */ (function () {
    function FormLoginComponent(authService, route, app, dialog, router, appMessage, appService) {
        this.authService = authService;
        this.route = route;
        this.app = app;
        this.dialog = dialog;
        this.router = router;
        this.appMessage = appMessage;
        this.appService = appService;
    }
    FormLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.login = { user: '', password: '' };
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
        this.route
            .params
            .subscribe(function (params) {
            _this.brand = params['brand'];
        });
        this.changeTheme(this.brand);
    };
    ;
    ;
    FormLoginComponent.prototype.doLogin = function (login) {
        var _this = this;
        // let observable = this.appService.xPost('authentication/login',login);
        if (login.user && login.password) {
            this.authService.doLogin(login).subscribe(function (data) {
                //if ( this.authService.isLoggedIn() ) {
                _this.appMessage.showSuccess('msg_login_success');
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                //Criar autenticação de administrador aqui
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/home';
                // Set our navigation extras object
                // that passes on our global query params and fragment
                var navigationExtras = {
                    preserveQueryParams: true,
                    preserveFragment: true
                };
                // let payload = data.json();
                //JSON.stringify()
                //this.msg = data.json().access_token;
                // console.log( this.msg );
                //JSON.parse(sessionStorage.getItem('currentUser'));
                //console.log(  sessionStorage.getItem( 'currentUser' ) );
                var theme = _this.appService.getSessionUser().theme;
                localStorage.setItem(_this.app.KEY_LOCAL_STORAGE, theme);
                _this.changeTheme("");
                // Redirect the user
                _this.router.navigate([redirect], navigationExtras);
            });
        }
    };
    /**
     *
     * Verifica o theme em :
     * - Entrar no login/<theme> - nissan / renault
     * - Pega o thema da sessão
     * - regra é invocada de varios endpoints por isso os varios IFs
     */
    FormLoginComponent.prototype.changeTheme = function (brandTheme) {
        var item = {};
        var theme = "";
        var var_local_theme = localStorage.getItem(this.app.KEY_LOCAL_STORAGE);
        if (brandTheme === this.app.BRAND_NISSAN) {
            theme = this.app.BRAND_NISSAN;
        }
        else if (brandTheme === this.app.BRAND_RENAULT) {
            theme = this.app.BRAND_RENAULT;
            /* } else if ( brandTheme === this.app.BRAND_RCI ) {
                 theme = this.app.BRAND_RCI;*/
        }
        else if (brandTheme) {
            theme = brandTheme;
        }
        else if (var_local_theme) {
            theme = var_local_theme;
        }
        else {
            theme = this.app.BRAND_NISSAN;
        }
        item["value"] = theme;
        this.app.changeTheme(item);
    };
    FormLoginComponent.prototype.forgotPassword = function () {
        var dialogRef = this.dialog.open(forgot_password_dialog_1.ForgotPasswordDialog, { height: 'auto', width: '30%', });
    };
    FormLoginComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'form-login',
            templateUrl: './app/login/form-login.html',
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.ActivatedRoute,
            app_component_1.AppComponent, material_1.MdDialog,
            router_1.Router, app_message_1.AppMessage, app_service_1.AppService])
    ], FormLoginComponent);
    return FormLoginComponent;
}());
exports.FormLoginComponent = FormLoginComponent;
//# sourceMappingURL=form-login.component.js.map