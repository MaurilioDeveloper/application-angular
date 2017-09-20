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
var professional_data_service_1 = require("./service/professional-data.service");
var core_1 = require("@angular/core");
var ProfessionalDataCustomerCardComponent = /** @class */ (function () {
    function ProfessionalDataCustomerCardComponent(professionalDataService) {
        this.professionalDataService = professionalDataService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    ProfessionalDataCustomerCardComponent.prototype.ngOnInit = function () {
        this.professionalDataService.init();
    };
    ProfessionalDataCustomerCardComponent.prototype.getListProvince = function () {
        return this.professionalDataService.listProvince;
    };
    ProfessionalDataCustomerCardComponent.prototype.getListSizeCompany = function () {
        return this.professionalDataService.listSizeCompany;
    };
    ProfessionalDataCustomerCardComponent.prototype.getListEconomicActivityGroup = function () {
        return this.professionalDataService.listEconomicActivityGroup;
    };
    ProfessionalDataCustomerCardComponent.prototype.getListEconomicActivity = function () {
        return this.professionalDataService.listEconomicActivity;
    };
    ProfessionalDataCustomerCardComponent.prototype.getListOccupation = function () {
        return this.professionalDataService.listOccupation;
    };
    ProfessionalDataCustomerCardComponent.prototype.getListPositionFunction = function () {
        return this.professionalDataService.listPositionFunction;
    };
    ProfessionalDataCustomerCardComponent.prototype.getListTypeOfIncome = function () {
        return this.professionalDataService.listTypeOfIncome;
    };
    ProfessionalDataCustomerCardComponent.prototype.getListTypeProofOfIncome = function () {
        return this.professionalDataService.listTypeProofOfIncome;
    };
    ProfessionalDataCustomerCardComponent.prototype.getIsRequiredCNPJ = function () {
        return this.professionalDataService.isRequiredCNPJ;
    };
    ProfessionalDataCustomerCardComponent.prototype.getSimulation = function () {
        return this.professionalDataService.simulation;
    };
    ProfessionalDataCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 6;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProfessionalDataCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ProfessionalDataCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProfessionalDataCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    ProfessionalDataCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'professional-data-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/professional_data_cc/professional_data_cc.component.html',
            providers: [professional_data_service_1.ProfessionalDataService]
        }),
        __metadata("design:paramtypes", [professional_data_service_1.ProfessionalDataService])
    ], ProfessionalDataCustomerCardComponent);
    return ProfessionalDataCustomerCardComponent;
}());
exports.ProfessionalDataCustomerCardComponent = ProfessionalDataCustomerCardComponent;
//# sourceMappingURL=professional_data_cc.component.js.map