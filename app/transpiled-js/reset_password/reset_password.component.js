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
var router_1 = require("@angular/router");
var app_message_1 = require("./../app.message");
var reset_password_dto_1 = require("./dto/reset_password.dto");
var app_component_1 = require("./../app.component");
var app_service_1 = require("./../app.service");
var core_1 = require("@angular/core");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(appService, app, appMessage, router, activatedRoute) {
        this.appService = appService;
        this.app = app;
        this.appMessage = appMessage;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.reset = new reset_password_dto_1.ResetPassword();
        this.verifyToken();
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent.prototype.verifyToken = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            console.log(params);
            _this.reset.idUser = params['idUser'];
            _this.reset.token = params['token'];
        });
        if (this.reset.idUser && this.reset.token) {
            var tokenResponse = this.appService.xNoAuthPost('forgotPassword/verify', this.reset);
            tokenResponse.subscribe(function (data) {
                var response = data.json();
                console.log('objeto response');
                console.log(response);
                _this.reset.idToken = response['idToken'];
            }, function (err) {
                console.log(err.json());
                _this.router.navigateByUrl('/login');
            });
        }
        else {
            this.appMessage.showError("msg-invalid-token");
            this.router.navigateByUrl('/login');
        }
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        var observable = this.appService.xNoAuthPost('forgotPassword/reset', this.reset);
        observable.subscribe(function (data) {
            _this.router.navigateByUrl('/login');
            _this.appMessage.showSuccess("msg-send-mail-success");
        }, function (err) {
            console.log(err.json());
            _this.reset.retryPassword = null;
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './app/reset_password/reset_password.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_component_1.AppComponent, app_message_1.AppMessage,
            router_1.Router, router_1.ActivatedRoute])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
;
//# sourceMappingURL=reset_password.component.js.map