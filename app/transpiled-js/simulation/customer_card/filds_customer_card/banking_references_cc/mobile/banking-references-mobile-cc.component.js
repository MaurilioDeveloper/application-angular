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
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var banking_service_service_1 = require("./../service/banking-service.service");
var BankingReferencesDataCustomerCardMobileComponent = /** @class */ (function () {
    function BankingReferencesDataCustomerCardMobileComponent(bankingDataService) {
        this.bankingDataService = bankingDataService;
        this.countClient = new core_2.EventEmitter();
        this.controlDynamicStepsM = new core_2.EventEmitter();
        this.conf = false;
    }
    ;
    BankingReferencesDataCustomerCardMobileComponent.prototype.ngOnInit = function () {
        this.bankingDataService.init();
    };
    BankingReferencesDataCustomerCardMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 8;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    BankingReferencesDataCustomerCardMobileComponent.prototype.getListBank = function () {
        return this.bankingDataService.listBank;
    };
    BankingReferencesDataCustomerCardMobileComponent.prototype.getListAccountType = function () {
        return this.bankingDataService.listAccountType;
    };
    BankingReferencesDataCustomerCardMobileComponent.prototype.getIsRequiredBanking = function () {
        return this.bankingDataService.isRequiredBanking;
    };
    BankingReferencesDataCustomerCardMobileComponent.prototype.getSimulation = function () {
        return this.bankingDataService.simulation;
    };
    BankingReferencesDataCustomerCardMobileComponent.prototype.selectBank = function () {
        this.bankingDataService.selectBank();
    };
    BankingReferencesDataCustomerCardMobileComponent.prototype.validCodeBankSelected = function () {
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
    BankingReferencesDataCustomerCardMobileComponent.prototype.validBankSelected = function () {
        this.bankingDataService.validBankSelected();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BankingReferencesDataCustomerCardMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], BankingReferencesDataCustomerCardMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], BankingReferencesDataCustomerCardMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.ViewChild('cmb'),
        __metadata("design:type", Object)
    ], BankingReferencesDataCustomerCardMobileComponent.prototype, "cmbBank", void 0);
    BankingReferencesDataCustomerCardMobileComponent = __decorate([
        core_3.Component({
            selector: 'banking-references-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/banking_references_cc/mobile/banking-references-mobile-cc.component.html',
            providers: [banking_service_service_1.BankingDataService]
        }),
        __metadata("design:paramtypes", [banking_service_service_1.BankingDataService])
    ], BankingReferencesDataCustomerCardMobileComponent);
    return BankingReferencesDataCustomerCardMobileComponent;
}());
exports.BankingReferencesDataCustomerCardMobileComponent = BankingReferencesDataCustomerCardMobileComponent;
//# sourceMappingURL=banking-references-mobile-cc.component.js.map