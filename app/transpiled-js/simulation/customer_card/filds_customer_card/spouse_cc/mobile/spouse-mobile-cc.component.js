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
var spouce_service_1 = require("./../service/spouce.service");
var core_1 = require("@angular/core");
var SpouseMobileComponent = /** @class */ (function () {
    function SpouseMobileComponent(spouseService) {
        this.spouseService = spouseService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    SpouseMobileComponent.prototype.ngOnInit = function () {
        this.spouseService.init();
    };
    SpouseMobileComponent.prototype.getSimulation = function () {
        return this.spouseService.simulation;
    };
    SpouseMobileComponent.prototype.getListProvince = function () {
        return this.spouseService.listProvince;
    };
    SpouseMobileComponent.prototype.getListSex = function () {
        return this.spouseService.listSex;
    };
    SpouseMobileComponent.prototype.getListOccupation = function () {
        return this.spouseService.listOccupation;
    };
    SpouseMobileComponent.prototype.getListPositionFunction = function () {
        return this.spouseService.listPositionFunction;
    };
    SpouseMobileComponent.prototype.getListIssuingBody = function () {
        return this.spouseService.listIssuingBody;
    };
    SpouseMobileComponent.prototype.getIsRequiredSpouse = function () {
        return this.spouseService.isRequiredSpouse;
    };
    SpouseMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 5;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SpouseMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SpouseMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SpouseMobileComponent.prototype, "controlDynamicStepsM", void 0);
    SpouseMobileComponent = __decorate([
        core_1.Component({
            selector: 'spouse-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/spouse_cc/mobile/spouse-mobile-cc.component.html',
            providers: [spouce_service_1.SpouseService]
        }),
        __metadata("design:paramtypes", [spouce_service_1.SpouseService])
    ], SpouseMobileComponent);
    return SpouseMobileComponent;
}());
exports.SpouseMobileComponent = SpouseMobileComponent;
//# sourceMappingURL=spouse-mobile-cc.component.js.map