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
var guarantor_2_professional_service_1 = require("./../service/guarantor-2-professional.service");
var core_1 = require("@angular/core");
var GuarantorTwoProfessionalCustomerMobileComponent = /** @class */ (function () {
    function GuarantorTwoProfessionalCustomerMobileComponent(guarantorTwoProfessionalService) {
        this.guarantorTwoProfessionalService = guarantorTwoProfessionalService;
        this.controlDynamicStepsM = new core_1.EventEmitter();
    }
    ;
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.ngOnInit = function () {
        this.guarantorTwoProfessionalService.init();
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getListProvince = function () {
        return this.guarantorTwoProfessionalService.listProvince;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getListSizeCompany = function () {
        return this.guarantorTwoProfessionalService.listSizeCompany;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getListEconomicActivityGroup = function () {
        return this.guarantorTwoProfessionalService.listEconomicActivityGroup;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getListEconomicActivity = function () {
        return this.guarantorTwoProfessionalService.listEconomicActivity;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getListOccupation = function () {
        return this.guarantorTwoProfessionalService.listOccupation;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getListPositionFunction = function () {
        return this.guarantorTwoProfessionalService.listPositionFunction;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getlistTypeOfIncome = function () {
        return this.guarantorTwoProfessionalService.listTypeOfIncome;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getListTypeProofOfIncome = function () {
        return this.guarantorTwoProfessionalService.listTypeProofOfIncome;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getIsRequiredNameGuarantor = function () {
        return this.guarantorTwoProfessionalService.isRequiredNameGuarantor;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getIsRequiredCNPJGuarantor = function () {
        return this.guarantorTwoProfessionalService.isRequiredCNPJGuarantor;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getIsRequiredPhoneGuarantor = function () {
        return this.guarantorTwoProfessionalService.isRequiredPhoneGuarantor;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.getSimulation = function () {
        return this.guarantorTwoProfessionalService.simulation;
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.validOccupation = function () {
        this.guarantorTwoProfessionalService.validOccupation();
    };
    GuarantorTwoProfessionalCustomerMobileComponent.prototype.nextStep = function () {
        this.controlDynamicStepsIn = 19;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorTwoProfessionalCustomerMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoProfessionalCustomerMobileComponent.prototype, "controlDynamicStepsM", void 0);
    GuarantorTwoProfessionalCustomerMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-professional-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_professional_cc/mobile/guarantor-2-professional-mobile-cc.component.html',
            providers: [guarantor_2_professional_service_1.GuarantorTwoProfessionalService]
        }),
        __metadata("design:paramtypes", [guarantor_2_professional_service_1.GuarantorTwoProfessionalService])
    ], GuarantorTwoProfessionalCustomerMobileComponent);
    return GuarantorTwoProfessionalCustomerMobileComponent;
}());
exports.GuarantorTwoProfessionalCustomerMobileComponent = GuarantorTwoProfessionalCustomerMobileComponent;
//# sourceMappingURL=guarantor-2-professional-mobile-cc.component.js.map