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
var ngx_toastr_1 = require("ngx-toastr");
var translate_1 = require("./translate");
var AppMessage = /** @class */ (function () {
    function AppMessage(toastrService, toastrConfig, _translate) {
        this.toastrService = toastrService;
        this._translate = _translate;
        toastrConfig.timeOut = 3000;
    }
    AppMessage.prototype.showDefaultSuccess = function () {
        this.showSuccess('common-msg-success');
    };
    AppMessage.prototype.showSuccess = function (msg) {
        this.toastrService.success(this._translate.instant(msg), this._translate.instant('common-msg-success-header') + ':');
    };
    AppMessage.prototype.showError = function (msg) {
        this.toastrService.error(this._translate.instant(msg), this._translate.instant('common-msg-error-header') + ':');
    };
    AppMessage.prototype.showInfo = function (msg) {
        this.toastrService.info(this._translate.instant(msg), this._translate.instant('common-msg-info-header') + ':');
    };
    AppMessage.prototype.showWarning = function (msg) {
        this.toastrService.warning(this._translate.instant(msg), this._translate.instant('common-msg-warn-header') + ':');
    };
    AppMessage.prototype.returnMsg = function (msg) {
        return this._translate.instant(msg);
    };
    AppMessage = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngx_toastr_1.ToastrService,
            ngx_toastr_1.ToastrConfig,
            translate_1.TranslateService])
    ], AppMessage);
    return AppMessage;
}());
exports.AppMessage = AppMessage;
//# sourceMappingURL=app.message.js.map