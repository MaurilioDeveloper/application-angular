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
var guarantor_2_banking_service_1 = require("./service/guarantor-2-banking.service");
var core_1 = require("@angular/core");
var Guarantor2BankingCustomerCardComponent = /** @class */ (function () {
    function Guarantor2BankingCustomerCardComponent(guarantorTwoBankingService) {
        this.guarantorTwoBankingService = guarantorTwoBankingService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    Guarantor2BankingCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorTwoBankingService.init();
    };
    Guarantor2BankingCustomerCardComponent.prototype.getListBank = function () {
        return this.guarantorTwoBankingService.listBank;
    };
    Guarantor2BankingCustomerCardComponent.prototype.getListAccountType = function () {
        return this.guarantorTwoBankingService.listAccountType;
    };
    Guarantor2BankingCustomerCardComponent.prototype.getIsRequiredBanking = function () {
        return this.guarantorTwoBankingService.isRequiredBanking;
    };
    Guarantor2BankingCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorTwoBankingService.simulation;
    };
    Guarantor2BankingCustomerCardComponent.prototype.validBankSelected = function () {
        this.guarantorTwoBankingService.validBankSelected();
    };
    Guarantor2BankingCustomerCardComponent.prototype.validCodeBankSelected = function () {
        if (this.cmdBankGuarantor2.selected)
            this.cmdBankGuarantor2.selected._selected = false;
        this.guarantorTwoBankingService.validCodeBankSelected();
    };
    Guarantor2BankingCustomerCardComponent.prototype.nextStep = function () {
        this.countClient.emit();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2BankingCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor2BankingCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2BankingCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.ViewChild("cmdbankguar2"),
        __metadata("design:type", Object)
    ], Guarantor2BankingCustomerCardComponent.prototype, "cmdBankGuarantor2", void 0);
    Guarantor2BankingCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-banking-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_banking_cc/guarantor_2_banking_cc.component.html',
            providers: [guarantor_2_banking_service_1.GuarantorTwoBankingService]
        }),
        __metadata("design:paramtypes", [guarantor_2_banking_service_1.GuarantorTwoBankingService])
    ], Guarantor2BankingCustomerCardComponent);
    return Guarantor2BankingCustomerCardComponent;
}());
exports.Guarantor2BankingCustomerCardComponent = Guarantor2BankingCustomerCardComponent;
//# sourceMappingURL=guarantor_2_banking_cc.component.js.map