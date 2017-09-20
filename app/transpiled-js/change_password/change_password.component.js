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
var app_message_1 = require("./../app.message");
var auth_service_1 = require("./../login/auth.service");
var change_password_dto_1 = require("./change_password.dto");
var app_service_1 = require("./../app.service");
var app_component_1 = require("./../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(appService, router, app, authService, appMessage) {
        this.appService = appService;
        this.router = router;
        this.app = app;
        this.authService = authService;
        this.appMessage = appMessage;
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.password = new change_password_dto_1.ChangePaword('', '', '');
        this.app.router = '/admin';
        console.log(this.app.router);
        this.supportedLangs = [
            { value: 'pt', img: 'assets/images/flagbr.png' },
            { value: 'fr', img: 'assets/images/flagfr.png' },
            { value: 'en', img: 'assets/images/flaguk.png' },
        ];
    };
    ChangePasswordComponent.prototype.changePassword = function () {
        var _this = this;
        var observable = this.appService.xUpdate('securityService/changePassword', this.password);
        observable.subscribe(function (data) {
            var payload = data.json();
            _this.msg = payload.msg;
            var login;
            login = { user: '', password: '' };
            login.user = payload.userLogin;
            login.password = _this.password.newPassword;
            _this.authService.doLogout();
            _this.authService.doLogin(login).subscribe(function (data2) {
                _this.router.navigateByUrl('/home');
                _this.appMessage.showSuccess("msg-change-password-success");
            });
        }, function (err) {
            console.log(err.json());
        });
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'change-password',
            templateUrl: './app/change_password/change_password.component.html',
            providers: [app_component_1.AppComponent]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            router_1.Router,
            app_component_1.AppComponent,
            auth_service_1.AuthService,
            app_message_1.AppMessage])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=change_password.component.js.map