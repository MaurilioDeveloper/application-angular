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
var flex_layout_1 = require("@angular/flex-layout");
var customer_card_service_1 = require("./../customer-card.service");
var core_1 = require("@angular/core");
var CustomerCardMobileComponent = /** @class */ (function () {
    function CustomerCardMobileComponent(media, customerCardService) {
        this.media = media;
        this.customerCardService = customerCardService;
        this.changeStep = new core_1.EventEmitter();
        this.count = 0;
        this.varBtnMarca = 'keyboard_arrow_up';
        this.varBtnDrop = 'keyboard_arrow_up';
        this.drop = false;
        this.drop2 = false;
    }
    ;
    CustomerCardMobileComponent.prototype.ngOnInit = function () {
        this.customerCardService.init();
        this.getSimulation().step = 6;
    };
    CustomerCardMobileComponent.prototype.getSimulation = function () {
        return this.customerCardService.simulation;
    };
    CustomerCardMobileComponent.prototype.isPhysicalPerson = function () {
        return this.customerCardService.isPhysicalPerson;
    };
    CustomerCardMobileComponent.prototype.countClient = function () {
        this.count += 1;
        if (this.count >= 15) {
            this.getSimulation().step4CanNext = true;
        }
        else {
            this.getSimulation().step4CanNext = false;
        }
    };
    CustomerCardMobileComponent.prototype.getControlDynamicSteps = function () {
        if (this.customerCardService.controlDynamicSteps === undefined) {
            this.customerCardService.controlDynamicSteps = 1;
            return this.customerCardService.controlDynamicSteps;
        }
        return this.customerCardService.controlDynamicSteps;
    };
    CustomerCardMobileComponent.prototype.isSpouseClient = function () {
        this.customerCardService.isSpouseClient;
    };
    CustomerCardMobileComponent.prototype.clicked = function () {
        if (this.drop) {
            this.drop = false;
            this.varBtnMarca = 'keyboard_arrow_down';
        }
        else {
            this.drop = true;
            this.varBtnMarca = 'keyboard_arrow_up';
        }
    };
    CustomerCardMobileComponent.prototype.hide = function () {
        if (this.drop2) {
            this.drop2 = false;
            this.varBtnDrop = 'keyboard_arrow_down';
        }
        else {
            this.drop2 = true;
            this.varBtnDrop = 'keyboard_arrow_up';
        }
    };
    CustomerCardMobileComponent.prototype.controlDynamicStepsM = function (dynamicSteps) {
        this.customerCardService.controlDynamicSteps = dynamicSteps;
    };
    CustomerCardMobileComponent.prototype.returnToStep = function (step) {
        this.customerCardService.controlDynamicSteps = step;
    };
    CustomerCardMobileComponent.prototype.changeSpouse = function (value) {
        this.customerCardService.showSpouse = value;
    };
    CustomerCardMobileComponent.prototype.getShowSpouse = function () {
        return this.customerCardService.showSpouse;
    };
    CustomerCardMobileComponent.prototype.changeSpouseGuarantor1 = function (value) {
        this.customerCardService.showSpouseGuarantor1 = value;
    };
    CustomerCardMobileComponent.prototype.getShowSpouseGuarantor1 = function () {
        return this.customerCardService.showSpouseGuarantor1;
    };
    CustomerCardMobileComponent.prototype.changeSpouseGuarantor2 = function (value) {
        this.customerCardService.showSpouseGuarantor2 = value;
    };
    CustomerCardMobileComponent.prototype.getShowSpouseGuarantor2 = function () {
        return this.customerCardService.showSpouseGuarantor2;
    };
    CustomerCardMobileComponent.prototype.changeGuarantor1 = function (value) {
        this.customerCardService.showGuarantor1 = value;
    };
    CustomerCardMobileComponent.prototype.getShowGuarantor1 = function () {
        return this.customerCardService.showGuarantor1;
    };
    CustomerCardMobileComponent.prototype.changeGuarantor2 = function (value) {
        this.customerCardService.showGuarantor2 = value;
    };
    CustomerCardMobileComponent.prototype.getShowGuarantor2 = function () {
        return this.customerCardService.showGuarantor2;
    };
    CustomerCardMobileComponent.prototype.getVerifyPhysicalSpouseGuarantor1 = function () {
        return this.customerCardService.verifyPhysicalSpouseGuarantor();
    };
    CustomerCardMobileComponent.prototype.getVerifyPhysicalSpouseGuarantor2 = function () {
        return this.customerCardService.verifyPhysicalSpouseGuarantor2();
    };
    CustomerCardMobileComponent.prototype.saveDossier = function () {
        this.customerCardService.saveDossier();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CustomerCardMobileComponent.prototype, "changeStep", void 0);
    CustomerCardMobileComponent = __decorate([
        core_1.Component({
            selector: 'customer-card-mobile',
            templateUrl: 'app/simulation/customer_card/mobile/customer_card-mobile.component.html',
            styleUrls: ['app/simulation/customer_card/customer_card.component.css'],
            providers: [customer_card_service_1.CustomerCardService]
        }),
        __metadata("design:paramtypes", [flex_layout_1.ObservableMedia, customer_card_service_1.CustomerCardService])
    ], CustomerCardMobileComponent);
    return CustomerCardMobileComponent;
}());
exports.CustomerCardMobileComponent = CustomerCardMobileComponent;
//# sourceMappingURL=customer_card-mobile.component.js.map