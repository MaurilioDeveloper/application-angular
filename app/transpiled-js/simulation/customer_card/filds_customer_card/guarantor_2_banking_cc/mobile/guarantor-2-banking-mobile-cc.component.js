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
var guarantor_2_banking_service_1 = require("./../service/guarantor-2-banking.service");
var core_1 = require("@angular/core");
var GuarantorTwoBankingMobileComponent = /** @class */ (function () {
    function GuarantorTwoBankingMobileComponent(guarantorTwoBankingService) {
        this.guarantorTwoBankingService = guarantorTwoBankingService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.changeStep = new core_1.EventEmitter();
        this.saveDossier = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    GuarantorTwoBankingMobileComponent.prototype.ngOnInit = function () {
        this.guarantorTwoBankingService.init();
    };
    GuarantorTwoBankingMobileComponent.prototype.getListBank = function () {
        return this.guarantorTwoBankingService.listBank;
    };
    GuarantorTwoBankingMobileComponent.prototype.getListAccountType = function () {
        return this.guarantorTwoBankingService.listAccountType;
    };
    GuarantorTwoBankingMobileComponent.prototype.getIsRequiredBanking = function () {
        return this.guarantorTwoBankingService.isRequiredBanking;
    };
    GuarantorTwoBankingMobileComponent.prototype.getSimulation = function () {
        return this.guarantorTwoBankingService.simulation;
    };
    GuarantorTwoBankingMobileComponent.prototype.validBankSelected = function () {
        this.guarantorTwoBankingService.validBankSelected();
    };
    GuarantorTwoBankingMobileComponent.prototype.validCodeBankSelected = function () {
        if (this.cmdBankGuarantor2.selected)
            this.cmdBankGuarantor2.selected._selected = false;
        this.guarantorTwoBankingService.validCodeBankSelected();
    };
    GuarantorTwoBankingMobileComponent.prototype.nextStep = function () {
        this.countClient.emit();
        this.getSimulation().step = 4;
        this.saveDossier.emit();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoBankingMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorTwoBankingMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoBankingMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoBankingMobileComponent.prototype, "changeStep", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoBankingMobileComponent.prototype, "saveDossier", void 0);
    __decorate([
        core_1.ViewChild("cmdbankguar2"),
        __metadata("design:type", Object)
    ], GuarantorTwoBankingMobileComponent.prototype, "cmdBankGuarantor2", void 0);
    GuarantorTwoBankingMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-banking-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_banking_cc/mobile/guarantor-2-banking-mobile-cc.component.html',
            providers: [guarantor_2_banking_service_1.GuarantorTwoBankingService]
        }),
        __metadata("design:paramtypes", [guarantor_2_banking_service_1.GuarantorTwoBankingService])
    ], GuarantorTwoBankingMobileComponent);
    return GuarantorTwoBankingMobileComponent;
}());
exports.GuarantorTwoBankingMobileComponent = GuarantorTwoBankingMobileComponent;
//# sourceMappingURL=guarantor-2-banking-mobile-cc.component.js.map