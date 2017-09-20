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
var material_1 = require("@angular/material");
var app_service_1 = require("./../../app.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var auth_service_1 = require("../../login/auth.service");
var app_message_1 = require("../../app.message");
var router_1 = require("@angular/router");
var MyProfileComponent = /** @class */ (function () {
    function MyProfileComponent(appService, authService, appMessage, router, app, dialogRef) {
        this.appService = appService;
        this.authService = authService;
        this.appMessage = appMessage;
        this.router = router;
        this.app = app;
        this.dialogRef = dialogRef;
        this.windows = [
            { value: 1, viewValue: '1' },
            { value: 2, viewValue: '2' },
            { value: 3, viewValue: '3' }
        ];
        this.windowSelected = 1;
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        this.app.router = '/admin';
        this.supportedLangs = [
            { value: 'pt', img: 'assets/images/flagbr.png' },
            { value: 'fr', img: 'assets/images/flagfr.png' },
            { value: 'en', img: 'assets/images/flaguk.png' },
        ];
        this.getProposalQuantity();
    };
    //TODO EMIT @OUTPUT app_component_selectLang
    MyProfileComponent.prototype.selectLang = function (lang) {
        // set default;
        return this.app.selectLang(lang);
    };
    MyProfileComponent.prototype.doLogout = function () {
        var _this = this;
        this.authService.doLogout().subscribe(function () {
            if (!_this.authService.isLoggedIn) {
                _this.appMessage.showSuccess("Usuário deslogado com sucesso");
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                var redirect = '/login';
                // Redirect the user
                _this.router.navigate([redirect]);
            }
        });
        console.log("concluido logout");
        this.dialogRef.close();
    };
    MyProfileComponent.prototype.resetPassword = function (user) {
        var _this = this;
        //this.slimLoader.start(); 
        // console.log(user);
        var observable = this.appService.xUpdate('/noauth/forgotPassword/reset/', user);
        observable.subscribe(function (data) {
            var payload = data.json();
            console.log(data.json());
            _this.msg = payload.msg;
        }, function (err) {
            console.log(err.json());
        });
    };
    MyProfileComponent.prototype.isShowReset = function () {
        return this.appService.hasRole('ADMINISTRADOR');
    };
    MyProfileComponent.prototype.changePassword = function () {
        this.dialogRef.close();
        this.router.navigateByUrl('/change_password');
    };
    MyProfileComponent.prototype.getProposalQuantity = function () {
        var _this = this;
        var observable = this.appService.xSearch('userProfile', 'proposalquantity');
        observable.subscribe(function (data) {
            var response = data.json();
            _this.windowSelected = response.proposalQuantity;
        }, function (err) {
            console.log(err.json());
        });
    };
    MyProfileComponent.prototype.saveProposalQuantity = function () {
        var quantity = { 'proposalQuantity': this.windowSelected };
        var observable = this.appService.xUpdate('userProfile/saveproposalquantity', quantity);
        observable.subscribe(function (data) {
        }, function (err) {
            console.log(err.json());
        });
    };
    MyProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './app/menu/profile/my_profile.dialog.html',
            providers: [app_component_1.AppComponent]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            auth_service_1.AuthService,
            app_message_1.AppMessage,
            router_1.Router,
            app_component_1.AppComponent,
            material_1.MdDialogRef])
    ], MyProfileComponent);
    return MyProfileComponent;
}());
exports.MyProfileComponent = MyProfileComponent;
;
//# sourceMappingURL=my_profile.dialog.js.map