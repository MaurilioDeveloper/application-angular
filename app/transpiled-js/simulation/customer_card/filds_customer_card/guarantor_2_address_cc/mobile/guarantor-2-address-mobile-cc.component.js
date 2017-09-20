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
var guarantor_2_address_service_1 = require("./../service/guarantor-2-address.service");
var SpouseType_enum_1 = require("./../../../../dto/client/SpouseType.enum");
var core_1 = require("@angular/core");
var GuarantorTwoAddressMobileComponent = /** @class */ (function () {
    function GuarantorTwoAddressMobileComponent(guarantorTwoAddressService) {
        this.guarantorTwoAddressService = guarantorTwoAddressService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    GuarantorTwoAddressMobileComponent.prototype.ngOnInit = function () {
        this.guarantorTwoAddressService.init();
    };
    GuarantorTwoAddressMobileComponent.prototype.getListProvince = function () {
        return this.guarantorTwoAddressService.listProvince;
    };
    GuarantorTwoAddressMobileComponent.prototype.getListTypeResidence = function () {
        return this.guarantorTwoAddressService.listTypeResidence;
    };
    GuarantorTwoAddressMobileComponent.prototype.getListMailingAddress = function () {
        return this.guarantorTwoAddressService.listMailingAddress;
    };
    GuarantorTwoAddressMobileComponent.prototype.getSimulation = function () {
        return this.guarantorTwoAddressService.simulation;
    };
    GuarantorTwoAddressMobileComponent.prototype.isSpouse = function () {
        return (this.getSimulation().client.civilState.value == SpouseType_enum_1.SpouseType.MARRIED ||
            this.getSimulation().client.civilState.value == SpouseType_enum_1.SpouseType.LIFE_PARTNER);
    };
    GuarantorTwoAddressMobileComponent.prototype.isPhysicalPerson = function () {
        return this.guarantorTwoAddressService.isPhysicalPerson;
    };
    GuarantorTwoAddressMobileComponent.prototype.nextStep = function () {
        if (this.isPhysicalPerson() && this.showSpouseGuarantor2) {
            this.controlDynamicStepsIn = 17;
        }
        else {
            this.controlDynamicStepsIn = 18;
            this.getSimulation().step++;
        }
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoAddressMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorTwoAddressMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoAddressMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], GuarantorTwoAddressMobileComponent.prototype, "showSpouseGuarantor2", void 0);
    GuarantorTwoAddressMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-address-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_address_cc/mobile/guarantor-2-address-mobile-cc.component.html',
            providers: [guarantor_2_address_service_1.GuarantorTwoAddressService]
        }),
        __metadata("design:paramtypes", [guarantor_2_address_service_1.GuarantorTwoAddressService])
    ], GuarantorTwoAddressMobileComponent);
    return GuarantorTwoAddressMobileComponent;
}());
exports.GuarantorTwoAddressMobileComponent = GuarantorTwoAddressMobileComponent;
//# sourceMappingURL=guarantor-2-address-mobile-cc.component.js.map