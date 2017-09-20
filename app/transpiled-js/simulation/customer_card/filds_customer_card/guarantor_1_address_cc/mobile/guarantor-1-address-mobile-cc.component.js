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
var SpouseType_enum_1 = require("./../../../../dto/client/SpouseType.enum");
var guarantor_1_address_service_1 = require("./../service/guarantor-1-address.service");
var core_1 = require("@angular/core");
var GuarantorOneAddressMobileComponent = /** @class */ (function () {
    function GuarantorOneAddressMobileComponent(guarantorAddressService) {
        this.guarantorAddressService = guarantorAddressService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
        this.listProvince = new Array();
        this.listTypeResidence = new Array();
        this.listMailingAddress = new Array();
    }
    ;
    GuarantorOneAddressMobileComponent.prototype.ngOnInit = function () {
        this.guarantorAddressService.init();
    };
    GuarantorOneAddressMobileComponent.prototype.getListProvince = function () {
        return this.guarantorAddressService.listProvince;
    };
    GuarantorOneAddressMobileComponent.prototype.getListTypeResidence = function () {
        return this.guarantorAddressService.listTypeResidence;
    };
    GuarantorOneAddressMobileComponent.prototype.getListMailingAddress = function () {
        return this.guarantorAddressService.listMailingAddress;
    };
    GuarantorOneAddressMobileComponent.prototype.getSimulation = function () {
        return this.guarantorAddressService.simulation;
    };
    GuarantorOneAddressMobileComponent.prototype.isSpouse = function () {
        return (this.getSimulation().client.civilState.value == SpouseType_enum_1.SpouseType.MARRIED ||
            this.getSimulation().client.civilState.value == SpouseType_enum_1.SpouseType.LIFE_PARTNER);
    };
    GuarantorOneAddressMobileComponent.prototype.isPhysicalPerson = function () {
        return this.guarantorAddressService.isPhysicalPerson;
    };
    GuarantorOneAddressMobileComponent.prototype.nextStep = function () {
        if (this.isPhysicalPerson() && this.showSpouseGuarantor1) {
            this.controlDynamicStepsIn = 11;
        }
        else {
            this.controlDynamicStepsIn = 12;
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
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorOneAddressMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOneAddressMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOneAddressMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], GuarantorOneAddressMobileComponent.prototype, "showSpouseGuarantor1", void 0);
    GuarantorOneAddressMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-address-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_address_cc/mobile/guarantor-1-address-mobile-cc.component.html',
            providers: [guarantor_1_address_service_1.GuarantoroOneAddressService]
        }),
        __metadata("design:paramtypes", [guarantor_1_address_service_1.GuarantoroOneAddressService])
    ], GuarantorOneAddressMobileComponent);
    return GuarantorOneAddressMobileComponent;
}());
exports.GuarantorOneAddressMobileComponent = GuarantorOneAddressMobileComponent;
//# sourceMappingURL=guarantor-1-address-mobile-cc.component.js.map