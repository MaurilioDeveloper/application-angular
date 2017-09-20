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
var form_client_service_1 = require("./service/form-client.service");
var flex_layout_1 = require("@angular/flex-layout");
var app_message_1 = require("./../../app.message");
var core_1 = require("@angular/core");
var FormClientComponent = /** @class */ (function () {
    function FormClientComponent(appMessage, media, formClientService) {
        this.appMessage = appMessage;
        this.media = media;
        this.formClientService = formClientService;
        this.changeStep = new core_1.EventEmitter();
        this.isViewInitialized = false;
        this.forceClose = false;
        this.SEMI_NOVOS = 2;
        this.formClientService.init();
    }
    ;
    FormClientComponent.prototype.ngOnInit = function () {
    };
    FormClientComponent.prototype.getSimulation = function () {
        return this.formClientService.simulation;
    };
    FormClientComponent.prototype.getListSaleType = function () {
        return this.formClientService.listSaleType;
    };
    FormClientComponent.prototype.getListProvinces = function () {
        return this.formClientService.listProvinces;
    };
    FormClientComponent.prototype.changeSaleType = function (event) {
        var saleType = event.value.value;
        if (saleType === this.SEMI_NOVOS) {
            if (this.getSimulation().car && !this.getSimulation().showNewOnes) {
                this.getSimulation().car = undefined;
            }
            this.getSimulation().showNewOnes = true;
        }
        else {
            this.getSimulation().showNewOnes = false;
        }
    };
    FormClientComponent.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
    };
    FormClientComponent.prototype.change = function (toFront) {
        this.changeStep.emit(toFront);
    };
    FormClientComponent.prototype.blurEmail = function ($event) {
        if (this.emailValid.nativeElement.className.indexOf('ng-invalid') != -1) {
            this.appMessage.showError("Campo E-mail inválido");
        }
    };
    FormClientComponent.prototype.validForm = function (valid) {
        if (this.isViewInitialized) {
            this.cpfcnpjClass = this.cpfcnpjValid.nativeElement.className.indexOf('ng-invalid');
            this.phoneClass = this.phoneValid.nativeElement.className.indexOf('ng-invalid');
        }
        if (valid && this.cpfcnpjClass == -1 && this.phoneClass == -1) {
            this.getSimulation().step1CanNext = true;
            return true;
        }
        this.getSimulation().step1CanNext = false;
        return false;
    };
    FormClientComponent.prototype.ngOnDestroy = function () {
        if (this.formClientService.dialogRef) {
            this.forceClose = true;
            this.formClientService.dialogRef.close();
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FormClientComponent.prototype, "changeStep", void 0);
    __decorate([
        core_1.ViewChild('ff'),
        __metadata("design:type", core_1.ElementRef)
    ], FormClientComponent.prototype, "ff", void 0);
    __decorate([
        core_1.ViewChild('emailElement'),
        __metadata("design:type", core_1.ElementRef)
    ], FormClientComponent.prototype, "emailValid", void 0);
    __decorate([
        core_1.ViewChild('cpfcnpjElement'),
        __metadata("design:type", core_1.ElementRef)
    ], FormClientComponent.prototype, "cpfcnpjValid", void 0);
    __decorate([
        core_1.ViewChild('phoneElement'),
        __metadata("design:type", core_1.ElementRef)
    ], FormClientComponent.prototype, "phoneValid", void 0);
    __decorate([
        core_1.HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormClientComponent.prototype, "blurEmail", null);
    FormClientComponent = __decorate([
        core_1.Component({
            selector: 'form-client',
            templateUrl: 'app/simulation/card_client/form_client.component.html',
            providers: [form_client_service_1.FormClientService]
        }),
        __metadata("design:paramtypes", [app_message_1.AppMessage, flex_layout_1.ObservableMedia, form_client_service_1.FormClientService])
    ], FormClientComponent);
    return FormClientComponent;
}());
exports.FormClientComponent = FormClientComponent;
//# sourceMappingURL=form_client.component.js.map