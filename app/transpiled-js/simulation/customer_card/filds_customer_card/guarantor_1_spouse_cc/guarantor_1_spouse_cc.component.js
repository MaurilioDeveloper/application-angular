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
var guarantor_1_spouse_service_1 = require("./service/guarantor-1-spouse.service");
var core_1 = require("@angular/core");
var Guarantor1SpouseCustomerCardComponent = /** @class */ (function () {
    function Guarantor1SpouseCustomerCardComponent(guarantorOneSpouseService) {
        this.guarantorOneSpouseService = guarantorOneSpouseService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    Guarantor1SpouseCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorOneSpouseService.init();
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getListProvince = function () {
        return this.guarantorOneSpouseService.listProvince;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getListIssuingBody = function () {
        return this.guarantorOneSpouseService.listIssuingBody;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getListSex = function () {
        return this.guarantorOneSpouseService.listSex;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getListTypePhone = function () {
        return this.guarantorOneSpouseService.listTypePhone;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getListDocumentType = function () {
        return this.guarantorOneSpouseService.listDocumentType;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getListOccupation = function () {
        return this.guarantorOneSpouseService.listOccupation;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getListPositionFunction = function () {
        return this.guarantorOneSpouseService.listPositionFunction;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorOneSpouseService.simulation;
    };
    Guarantor1SpouseCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 12;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor1SpouseCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1SpouseCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1SpouseCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    Guarantor1SpouseCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-spouse-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_spouse_cc/guarantor_1_spouse_cc.component.html',
            providers: [guarantor_1_spouse_service_1.GuarantorOneSpouseService]
        }),
        __metadata("design:paramtypes", [guarantor_1_spouse_service_1.GuarantorOneSpouseService])
    ], Guarantor1SpouseCustomerCardComponent);
    return Guarantor1SpouseCustomerCardComponent;
}());
exports.Guarantor1SpouseCustomerCardComponent = Guarantor1SpouseCustomerCardComponent;
//# sourceMappingURL=guarantor_1_spouse_cc.component.js.map