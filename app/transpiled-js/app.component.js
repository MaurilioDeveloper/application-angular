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
var core_1 = require("@angular/core");
var translate_1 = require("./translate");
var material_1 = require("@angular/material");
var app_spinner_1 = require("./app.spinner");
var AppComponent = /** @class */ (function () {
    function AppComponent(_translate, loaderService, overlayContainer) {
        this._translate = _translate;
        this.loaderService = loaderService;
        this.overlayContainer = overlayContainer;
        this.languageBR = "assets/images/flagbr.png";
        this.languageFR = "assets/images/flagfr.png";
        this.languageEN = "assets/images/flaguk.png";
        this.languageSP = "assets/images/flagspain.png";
        this.KEY_LOCAL_STORAGE = 'omega2_local_theme';
        this.BRAND_NISSAN = 'nissan';
        this.BRAND_RENAULT = 'renault';
        this.BRAND_RCI = 'rci';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // set language
        this._translate.setDefaultLang('pt');
        this._translate.enableFallback(true);
        this.selectLang('pt');
        //set spinner loader
        this.loaderService.status.subscribe(function (val) {
            _this.showLoader = val;
        });
        this.theme = localStorage.getItem(this.KEY_LOCAL_STORAGE);
        this.overlayContainer.themeClass = this.theme;
        if (this.theme == null) {
            this.theme = this.BRAND_NISSAN;
            this.overlayContainer.themeClass = this.BRAND_NISSAN;
        }
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this._translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        // set default;
        this._translate.use(lang);
    };
    AppComponent.prototype.changeTheme = function (selectedItem) {
        this.theme = selectedItem.value;
        this.overlayContainer.themeClass = selectedItem.value;
    };
    AppComponent.prototype.isShowHeader = function () {
        var currenteUser = JSON.parse(sessionStorage.getItem('currentUser'));
        //let user : User = sessionStorage.getItem('currentUser')
        var isUserLogged = false;
        if (currenteUser) {
            //  console.log(currenteUser.access_token);
            isUserLogged = true;
        }
        else {
            isUserLogged = false;
        }
        return isUserLogged;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app/app.component.html',
        }),
        __metadata("design:paramtypes", [translate_1.TranslateService, app_spinner_1.LoaderService, material_1.OverlayContainer])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map