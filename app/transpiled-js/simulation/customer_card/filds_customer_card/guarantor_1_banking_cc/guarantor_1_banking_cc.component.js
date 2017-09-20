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
var guarantor_1_banking_service_1 = require("./service/guarantor-1-banking.service");
var core_1 = require("@angular/core");
var Guarantor1BankingCustomerCardComponent = /** @class */ (function () {
    function Guarantor1BankingCustomerCardComponent(guarantorOneBankingService) {
        this.guarantorOneBankingService = guarantorOneBankingService;
        this.controlDynamicStepsM = new core_1.EventEmitter();
    }
    ;
    Guarantor1BankingCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorOneBankingService.init();
    };
    Guarantor1BankingCustomerCardComponent.prototype.getListBank = function () {
        return this.guarantorOneBankingService.listBank;
    };
    Guarantor1BankingCustomerCardComponent.prototype.getListAccountType = function () {
        return this.guarantorOneBankingService.listAccountType;
    };
    Guarantor1BankingCustomerCardComponent.prototype.getIsRequiredBanking = function () {
        return this.guarantorOneBankingService.isRequiredBanking;
    };
    Guarantor1BankingCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorOneBankingService.simulation;
    };
    Guarantor1BankingCustomerCardComponent.prototype.validBankSelected = function () {
        this.guarantorOneBankingService.validBankSelected();
    };
    Guarantor1BankingCustomerCardComponent.prototype.validCodeBankSelected = function () {
        if (this.cmdBankGuarantor1.selected)
            this.cmdBankGuarantor1.selected._selected = false;
        this.guarantorOneBankingService.validCodeBankSelected();
    };
    Guarantor1BankingCustomerCardComponent.prototype.nextStep = function () {
        this.controlDynamicStepsIn = 15;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor1BankingCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1BankingCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.ViewChild("cmdbankguar1"),
        __metadata("design:type", Object)
    ], Guarantor1BankingCustomerCardComponent.prototype, "cmdBankGuarantor1", void 0);
    Guarantor1BankingCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-banking-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_banking_cc/guarantor_1_banking_cc.component.html',
            providers: [guarantor_1_banking_service_1.GuarantorOneBankingService]
        }),
        __metadata("design:paramtypes", [guarantor_1_banking_service_1.GuarantorOneBankingService])
    ], Guarantor1BankingCustomerCardComponent);
    return Guarantor1BankingCustomerCardComponent;
}());
exports.Guarantor1BankingCustomerCardComponent = Guarantor1BankingCustomerCardComponent;
//# sourceMappingURL=guarantor_1_banking_cc.component.js.map