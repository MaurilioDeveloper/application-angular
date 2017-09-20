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
var app_component_1 = require("./../app.component");
var router_1 = require("@angular/router");
var app_service_1 = require("./../app.service");
var forgot_password_dto_1 = require("./dto/forgot_password.dto");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var ForgotPasswordDialog = /** @class */ (function () {
    function ForgotPasswordDialog(appService, appMessage, dialogRef, route, app) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.dialogRef = dialogRef;
        this.route = route;
        this.app = app;
    }
    ForgotPasswordDialog.prototype.ngOnInit = function () {
        this.forgotPassword = new forgot_password_dto_1.ForgotPassword();
        this.forgotPassword.path = document.location.origin;
        this.forgotPassword.theme = this.app.overlayContainer.themeClass;
        // console.log(this.app.overlayContainer.themeClass);
    };
    ForgotPasswordDialog.prototype.requestToken = function () {
        var _this = this;
        var result = this.appService.xNoAuthPost('forgotPassword/request', this.forgotPassword);
        console.log(this.forgotPassword);
        result.subscribe(function (data) {
            _this.appMessage.showSuccess('msg-send-mail-success');
        }, function (err) {
            console.log(err.json());
        });
        this.dialogRef.close();
    };
    ForgotPasswordDialog = __decorate([
        core_1.Component({
            selector: 'app-forgot-password',
            templateUrl: './app/forgot_password_dialog/forgot_password.dialog.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage,
            material_1.MdDialogRef, router_1.Router, app_component_1.AppComponent])
    ], ForgotPasswordDialog);
    return ForgotPasswordDialog;
}());
exports.ForgotPasswordDialog = ForgotPasswordDialog;
//# sourceMappingURL=forgot_password.dialog.js.map