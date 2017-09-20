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
var guarantor_2_professional_service_1 = require("./service/guarantor-2-professional.service");
var core_1 = require("@angular/core");
var Guarantor2ProfessionalCustomerCardComponent = /** @class */ (function () {
    function Guarantor2ProfessionalCustomerCardComponent(guarantorTwoProfessionalService) {
        this.guarantorTwoProfessionalService = guarantorTwoProfessionalService;
        this.controlDynamicStepsM = new core_1.EventEmitter();
    }
    ;
    Guarantor2ProfessionalCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorTwoProfessionalService.init();
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getListProvince = function () {
        return this.guarantorTwoProfessionalService.listProvince;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getListSizeCompany = function () {
        return this.guarantorTwoProfessionalService.listSizeCompany;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getListEconomicActivityGroup = function () {
        return this.guarantorTwoProfessionalService.listEconomicActivityGroup;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getListEconomicActivity = function () {
        return this.guarantorTwoProfessionalService.listEconomicActivity;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getListOccupation = function () {
        return this.guarantorTwoProfessionalService.listOccupation;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getListPositionFunction = function () {
        return this.guarantorTwoProfessionalService.listPositionFunction;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getlistTypeOfIncome = function () {
        return this.guarantorTwoProfessionalService.listTypeOfIncome;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getListTypeProofOfIncome = function () {
        return this.guarantorTwoProfessionalService.listTypeProofOfIncome;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getIsRequiredNameGuarantor = function () {
        return this.guarantorTwoProfessionalService.isRequiredNameGuarantor;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getIsRequiredCNPJGuarantor = function () {
        return this.guarantorTwoProfessionalService.isRequiredCNPJGuarantor;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getIsRequiredPhoneGuarantor = function () {
        return this.guarantorTwoProfessionalService.isRequiredPhoneGuarantor;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorTwoProfessionalService.simulation;
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.validOccupation = function () {
        this.guarantorTwoProfessionalService.validOccupation();
    };
    Guarantor2ProfessionalCustomerCardComponent.prototype.nextStep = function () {
        this.controlDynamicStepsIn = 19;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor2ProfessionalCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2ProfessionalCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    Guarantor2ProfessionalCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-professional-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_professional_cc/guarantor_2_professional_cc.component.html',
            providers: [guarantor_2_professional_service_1.GuarantorTwoProfessionalService]
        }),
        __metadata("design:paramtypes", [guarantor_2_professional_service_1.GuarantorTwoProfessionalService])
    ], Guarantor2ProfessionalCustomerCardComponent);
    return Guarantor2ProfessionalCustomerCardComponent;
}());
exports.Guarantor2ProfessionalCustomerCardComponent = Guarantor2ProfessionalCustomerCardComponent;
//# sourceMappingURL=guarantor_2_professional_cc.component.js.map