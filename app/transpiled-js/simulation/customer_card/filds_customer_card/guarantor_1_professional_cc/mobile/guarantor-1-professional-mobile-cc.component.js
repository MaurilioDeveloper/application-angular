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
var guarantor_1_professional_service_1 = require("./../service/guarantor-1-professional.service");
var core_1 = require("@angular/core");
var GuarantorOneProfessionalCustomerMobileComponent = /** @class */ (function () {
    function GuarantorOneProfessionalCustomerMobileComponent(guarantorOneProfessionalService) {
        this.guarantorOneProfessionalService = guarantorOneProfessionalService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    GuarantorOneProfessionalCustomerMobileComponent.prototype.ngOnInit = function () {
        this.guarantorOneProfessionalService.init();
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListProvince = function () {
        return this.guarantorOneProfessionalService.listProvince;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListSizeCompany = function () {
        return this.guarantorOneProfessionalService.listSizeCompany;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListEconomicActivityGroup = function () {
        return this.guarantorOneProfessionalService.listEconomicActivityGroup;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListEconomicActivity = function () {
        return this.guarantorOneProfessionalService.listEconomicActivity;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListOccupation = function () {
        return this.guarantorOneProfessionalService.listOccupation;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListPositionFunction = function () {
        return this.guarantorOneProfessionalService.listPositionFunction;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListTypeOfIncome = function () {
        return this.guarantorOneProfessionalService.listTypeOfIncome;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getListTypeProofOfIncome = function () {
        return this.guarantorOneProfessionalService.listTypeProofOfIncome;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getIsRequiredNameGuarantor = function () {
        return this.guarantorOneProfessionalService.isRequiredNameGuarantor;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getIsRequiredCNPJGuarantor = function () {
        return this.guarantorOneProfessionalService.isRequiredCNPJGuarantor;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getIsRequiredPhoneGuarantor = function () {
        return this.guarantorOneProfessionalService.isRequiredPhoneGuarantor;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.getSimulation = function () {
        return this.guarantorOneProfessionalService.simulation;
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.validOccupation = function () {
        return this.guarantorOneProfessionalService.validOccupation();
    };
    GuarantorOneProfessionalCustomerMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 13;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOneProfessionalCustomerMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorOneProfessionalCustomerMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOneProfessionalCustomerMobileComponent.prototype, "controlDynamicStepsM", void 0);
    GuarantorOneProfessionalCustomerMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-professional-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_professional_cc/mobile/guarantor-1-professional-mobile-cc.component.html',
            providers: [guarantor_1_professional_service_1.GuarantorOneProfessionalService]
        }),
        __metadata("design:paramtypes", [guarantor_1_professional_service_1.GuarantorOneProfessionalService])
    ], GuarantorOneProfessionalCustomerMobileComponent);
    return GuarantorOneProfessionalCustomerMobileComponent;
}());
exports.GuarantorOneProfessionalCustomerMobileComponent = GuarantorOneProfessionalCustomerMobileComponent;
//# sourceMappingURL=guarantor-1-professional-mobile-cc.component.js.map