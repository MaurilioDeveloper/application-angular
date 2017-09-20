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
var guarantor_1_spouse_service_1 = require("./../service/guarantor-1-spouse.service");
var core_1 = require("@angular/core");
var GuarantorOneSpouseMobileComponent = /** @class */ (function () {
    function GuarantorOneSpouseMobileComponent(guarantorOneSpouseService) {
        this.guarantorOneSpouseService = guarantorOneSpouseService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    GuarantorOneSpouseMobileComponent.prototype.ngOnInit = function () {
        this.guarantorOneSpouseService.init();
    };
    GuarantorOneSpouseMobileComponent.prototype.getListProvince = function () {
        return this.guarantorOneSpouseService.listProvince;
    };
    GuarantorOneSpouseMobileComponent.prototype.getListIssuingBody = function () {
        return this.guarantorOneSpouseService.listIssuingBody;
    };
    GuarantorOneSpouseMobileComponent.prototype.getListSex = function () {
        return this.guarantorOneSpouseService.listSex;
    };
    GuarantorOneSpouseMobileComponent.prototype.getListTypePhone = function () {
        return this.guarantorOneSpouseService.listTypePhone;
    };
    GuarantorOneSpouseMobileComponent.prototype.getListDocumentType = function () {
        return this.guarantorOneSpouseService.listDocumentType;
    };
    GuarantorOneSpouseMobileComponent.prototype.getListOccupation = function () {
        return this.guarantorOneSpouseService.listOccupation;
    };
    GuarantorOneSpouseMobileComponent.prototype.getListPositionFunction = function () {
        return this.guarantorOneSpouseService.listPositionFunction;
    };
    GuarantorOneSpouseMobileComponent.prototype.getSimulation = function () {
        return this.guarantorOneSpouseService.simulation;
    };
    GuarantorOneSpouseMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 12;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorOneSpouseMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOneSpouseMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOneSpouseMobileComponent.prototype, "controlDynamicStepsM", void 0);
    GuarantorOneSpouseMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-spouse-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_spouse_cc/mobile/guarantor-1-spouse-mobile-cc.component.html',
            providers: [guarantor_1_spouse_service_1.GuarantorOneSpouseService]
        }),
        __metadata("design:paramtypes", [guarantor_1_spouse_service_1.GuarantorOneSpouseService])
    ], GuarantorOneSpouseMobileComponent);
    return GuarantorOneSpouseMobileComponent;
}());
exports.GuarantorOneSpouseMobileComponent = GuarantorOneSpouseMobileComponent;
//# sourceMappingURL=guarantor-1-spouse-mobile-cc.component.js.map