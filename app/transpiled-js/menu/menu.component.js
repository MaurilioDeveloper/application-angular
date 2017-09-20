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
var translate_service_1 = require("./../translate/translate.service");
var material_1 = require("@angular/material");
var app_service_1 = require("./../app.service");
var app_component_1 = require("./../app.component");
var core_1 = require("@angular/core");
var auth_service_1 = require("./../login/auth.service");
var app_message_1 = require("./../app.message");
var router_1 = require("@angular/router");
var my_profile_dialog_1 = require("./profile/my_profile.dialog");
var MenuComponent = /** @class */ (function () {
    function MenuComponent(app, router, authService, appMessage, appService, dialog, _translate) {
        this.app = app;
        this.router = router;
        this.authService = authService;
        this.appMessage = appMessage;
        this.appService = appService;
        this.dialog = dialog;
        this._translate = _translate;
        this.click = 0;
        this.notificationHide = false;
        this.brands = [this.app.BRAND_RENAULT, this.app.BRAND_NISSAN, this.app.BRAND_RCI];
        this.buidMsgCurrentUser();
    }
    MenuComponent.prototype.buidMsgCurrentUser = function () {
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser) {
            var welcome = this._translate.instant('lb-welcome');
            this.msgCurrentUser = welcome + ' <b>' + currentUser['name'] + '</b>';
        }
    };
    MenuComponent.prototype.dialogPerfil = function () {
        var dialogRef = this.dialog.open(my_profile_dialog_1.MyProfileComponent, { width: '50%' });
    };
    MenuComponent.prototype.notificationClick = function () {
        this.notificationHide = !this.notificationHide;
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'app-menu',
            templateUrl: './app/menu/menu.component.html',
        }),
        __metadata("design:paramtypes", [app_component_1.AppComponent,
            router_1.Router,
            auth_service_1.AuthService,
            app_message_1.AppMessage,
            app_service_1.AppService,
            material_1.MdDialog,
            translate_service_1.TranslateService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map