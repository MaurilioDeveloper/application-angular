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
var guarantor_1_professional_service_1 = require("./service/guarantor-1-professional.service");
var core_1 = require("@angular/core");
var Guarantor1ProfessionalCustomerCardComponent = /** @class */ (function () {
    function Guarantor1ProfessionalCustomerCardComponent(guarantorOneProfessionalService) {
        this.guarantorOneProfessionalService = guarantorOneProfessionalService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    Guarantor1ProfessionalCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorOneProfessionalService.init();
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListProvince = function () {
        return this.guarantorOneProfessionalService.listProvince;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListSizeCompany = function () {
        return this.guarantorOneProfessionalService.listSizeCompany;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListEconomicActivityGroup = function () {
        return this.guarantorOneProfessionalService.listEconomicActivityGroup;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListEconomicActivity = function () {
        return this.guarantorOneProfessionalService.listEconomicActivity;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListOccupation = function () {
        return this.guarantorOneProfessionalService.listOccupation;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListPositionFunction = function () {
        return this.guarantorOneProfessionalService.listPositionFunction;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListTypeOfIncome = function () {
        return this.guarantorOneProfessionalService.listTypeOfIncome;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getListTypeProofOfIncome = function () {
        return this.guarantorOneProfessionalService.listTypeProofOfIncome;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getIsRequiredNameGuarantor = function () {
        return this.guarantorOneProfessionalService.isRequiredNameGuarantor;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getIsRequiredCNPJGuarantor = function () {
        return this.guarantorOneProfessionalService.isRequiredCNPJGuarantor;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getIsRequiredPhoneGuarantor = function () {
        return this.guarantorOneProfessionalService.isRequiredPhoneGuarantor;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorOneProfessionalService.simulation;
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.validOccupation = function () {
        return this.guarantorOneProfessionalService.validOccupation();
    };
    Guarantor1ProfessionalCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 13;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1ProfessionalCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor1ProfessionalCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1ProfessionalCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    Guarantor1ProfessionalCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-professional-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_professional_cc/guarantor_1_professional_cc.component.html',
            providers: [guarantor_1_professional_service_1.GuarantorOneProfessionalService]
        }),
        __metadata("design:paramtypes", [guarantor_1_professional_service_1.GuarantorOneProfessionalService])
    ], Guarantor1ProfessionalCustomerCardComponent);
    return Guarantor1ProfessionalCustomerCardComponent;
}());
exports.Guarantor1ProfessionalCustomerCardComponent = Guarantor1ProfessionalCustomerCardComponent;
//# sourceMappingURL=guarantor_1_professional_cc.component.js.map