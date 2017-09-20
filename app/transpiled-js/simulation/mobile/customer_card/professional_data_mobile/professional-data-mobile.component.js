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
var professional_data_service_1 = require("./../../../services/customer_card/professional-data.service");
var core_1 = require("@angular/core");
var ProfessionalDataCustomerCardMobileComponent = (function () {
    function ProfessionalDataCustomerCardMobileComponent(professionalDataService) {
        this.professionalDataService = professionalDataService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    ProfessionalDataCustomerCardMobileComponent.prototype.ngOnInit = function () {
        this.professionalDataService.loadInitService();
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getSimulation = function () {
        return this.professionalDataService.simulation;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListProvince = function () {
        return this.professionalDataService.listProvince;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListSizeCompany = function () {
        return this.professionalDataService.listSizeCompany;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListEconomicActivityGroup = function () {
        return this.professionalDataService.listEconomicActivityGroup;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListEconomicActivity = function () {
        return this.professionalDataService.listEconomicActivity;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListOccupation = function () {
        return this.professionalDataService.listOccupation;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListPositionFunction = function () {
        return this.professionalDataService.listPositionFunction;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListTypeOfIncome = function () {
        return this.professionalDataService.listTypeOfIncome;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.getListTypeProofOfIncome = function () {
        return this.professionalDataService.listTypeProofOfIncome;
    };
    ProfessionalDataCustomerCardMobileComponent.prototype.nextStep = function () {
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
    ], ProfessionalDataCustomerCardMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ProfessionalDataCustomerCardMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProfessionalDataCustomerCardMobileComponent.prototype, "controlDynamicStepsM", void 0);
    ProfessionalDataCustomerCardMobileComponent = __decorate([
        core_1.Component({
            selector: 'professional-data-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/professional_data_cc/professional_data_cc.component.html',
            providers: [professional_data_service_1.ProfessionalDataService]
        }),
        __metadata("design:paramtypes", [professional_data_service_1.ProfessionalDataService])
    ], ProfessionalDataCustomerCardMobileComponent);
    return ProfessionalDataCustomerCardMobileComponent;
}());
exports.ProfessionalDataCustomerCardMobileComponent = ProfessionalDataCustomerCardMobileComponent;
//# sourceMappingURL=professional-data-mobile.component.js.map