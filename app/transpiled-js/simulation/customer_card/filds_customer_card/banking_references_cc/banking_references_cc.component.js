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
var banking_service_service_1 = require("./service/banking-service.service");
var core_1 = require("@angular/core");
var BankingReferencesDataCustomerCardComponent = /** @class */ (function () {
    function BankingReferencesDataCustomerCardComponent(bankingDataService) {
        this.bankingDataService = bankingDataService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    BankingReferencesDataCustomerCardComponent.prototype.ngOnInit = function () {
        this.bankingDataService.init();
    };
    BankingReferencesDataCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 8;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    BankingReferencesDataCustomerCardComponent.prototype.getListBank = function () {
        return this.bankingDataService.listBank;
    };
    BankingReferencesDataCustomerCardComponent.prototype.getListAccountType = function () {
        return this.bankingDataService.listAccountType;
    };
    BankingReferencesDataCustomerCardComponent.prototype.getIsRequiredBanking = function () {
        return this.bankingDataService.isRequiredBanking;
    };
    BankingReferencesDataCustomerCardComponent.prototype.getSimulation = function () {
        return this.bankingDataService.simulation;
    };
    BankingReferencesDataCustomerCardComponent.prototype.selectBank = function () {
        this.bankingDataService.selectBank();
    };
    BankingReferencesDataCustomerCardComponent.prototype.validCodeBankSelected = function () {
        var _this = this;
        this.cmbBank.options.forEach(function (element) {
            if (element._selected) {
                element._selected = false;
                _this.getSimulation().client.bankDetails.bank.id = null;
                return true;
            }
        });
        this.bankingDataService.validCodeBankSelected();
    };
    BankingReferencesDataCustomerCardComponent.prototype.validBankSelected = function () {
        this.bankingDataService.validBankSelected();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BankingReferencesDataCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BankingReferencesDataCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BankingReferencesDataCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.ViewChild('cmb'),
        __metadata("design:type", Object)
    ], BankingReferencesDataCustomerCardComponent.prototype, "cmbBank", void 0);
    BankingReferencesDataCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'banking-references-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/banking_references_cc/banking_references_cc.component.html',
            providers: [banking_service_service_1.BankingDataService]
        }),
        __metadata("design:paramtypes", [banking_service_service_1.BankingDataService])
    ], BankingReferencesDataCustomerCardComponent);
    return BankingReferencesDataCustomerCardComponent;
}());
exports.BankingReferencesDataCustomerCardComponent = BankingReferencesDataCustomerCardComponent;
//# sourceMappingURL=banking_references_cc.component.js.map