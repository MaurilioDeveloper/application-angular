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
var guarantor_2_spouse_service_1 = require("./service/guarantor-2-spouse.service");
var core_1 = require("@angular/core");
var Guarantor2SpouseCustomerCardComponent = /** @class */ (function () {
    function Guarantor2SpouseCustomerCardComponent(guarantorTwoSpouseService) {
        this.guarantorTwoSpouseService = guarantorTwoSpouseService;
        this.controlDynamicStepsM = new core_1.EventEmitter();
    }
    Guarantor2SpouseCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorTwoSpouseService.init();
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getListProvince = function () {
        return this.guarantorTwoSpouseService.listProvince;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getListSex = function () {
        return this.guarantorTwoSpouseService.listSex;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getListTypePhone = function () {
        return this.guarantorTwoSpouseService.listTypePhone;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getListDocumentType = function () {
        return this.guarantorTwoSpouseService.listDocumentType;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getListOccupation = function () {
        return this.guarantorTwoSpouseService.listOccupation;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getListPositionFunction = function () {
        return this.guarantorTwoSpouseService.listPositionFunction;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getListIssuingBody = function () {
        return this.guarantorTwoSpouseService.listIssuingBody;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorTwoSpouseService.simulation;
    };
    Guarantor2SpouseCustomerCardComponent.prototype.nextStep = function () {
        this.controlDynamicStepsIn = 18;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor2SpouseCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2SpouseCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    Guarantor2SpouseCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-spouse-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_spouse_cc/guarantor_2_spouse_cc.component.html',
            providers: [guarantor_2_spouse_service_1.GuarantorTwoSpouseService]
        }),
        __metadata("design:paramtypes", [guarantor_2_spouse_service_1.GuarantorTwoSpouseService])
    ], Guarantor2SpouseCustomerCardComponent);
    return Guarantor2SpouseCustomerCardComponent;
}());
exports.Guarantor2SpouseCustomerCardComponent = Guarantor2SpouseCustomerCardComponent;
//# sourceMappingURL=guarantor_2_spouse_cc.component.js.map